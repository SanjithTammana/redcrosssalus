'use client';

import React, { useState, useEffect, useRef } from 'react';
import { styled } from '@mui/material/styles';
import {
  Box,
  TextField,
  Button,
  CircularProgress,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';

// Styled components
const ChatContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  height: 'calc(100vh - 64px)',
  background: 'linear-gradient(to bottom, var(--red-cross-white), var(--secondary-gray))',
  color: 'var(--red-cross-black)',
  overflow: 'hidden',
}));

const StickyToggleContainer = styled(Box)(({ theme }) => ({
  padding: '8px',
  textAlign: 'center',
  backgroundColor: 'var(--red-cross-white)',
  borderBottom: '1px solid var(--secondary-gray)',
  position: 'sticky',
  top: 0,
  zIndex: 1000,
}));

const MessagesContainer = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  overflowY: 'auto',
  padding: '16px',
  [theme.breakpoints.down('sm')]: {
    padding: '8px',
  },
}));

const MessageBubble = styled(Box)(({ sender, theme }) => ({
  display: 'block',
  marginBottom: '8px',
  textAlign: sender === 'user' ? 'right' : 'left',
  '& div': {
    display: 'inline-block',
    padding: '10px 16px',
    borderRadius: '12px',
    background: sender === 'user' ? 'var(--red-cross-red)' : 'var(--red-cross-white)',
    color: sender === 'user' ? 'var(--red-cross-white)' : 'var(--red-cross-black)',
    maxWidth: '70%',
    wordWrap: 'break-word',
    animation: 'fadeIn 0.3s ease-in-out',
    fontSize: '1rem',
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.9rem',
    },
  },
}));

const BulletPoint = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginLeft: '16px',
  marginBottom: '4px',
  backgroundColor: 'var(--secondary-gray)',
  borderRadius: '4px',
  padding: '8px',
  fontSize: '0.9rem',
  fontStyle: 'italic',
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.8rem',
  },
}));

const BulletIcon = styled(Box)(({ theme }) => ({
  width: '10px',
  height: '10px',
  backgroundColor: 'var(--red-cross-red)',
  borderRadius: '50%',
  marginRight: '8px',
}));

const StepNumber = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  marginBottom: '4px',
  fontSize: '1rem',
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.9rem',
  },
}));

const RegularText = styled(Typography)(({ theme }) => ({
  fontSize: '1rem',
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.9rem',
  },
}));

const InputContainer = styled(Box)(({ theme }) => ({
  padding: '16px',
  backgroundColor: 'var(--red-cross-white)',
  borderTop: '1px solid var(--secondary-gray)',
  display: 'flex',
  gap: '8px',
  alignItems: 'center',
  [theme.breakpoints.down('sm')]: {
    padding: '8px',
  },
}));

const StyledButton = styled(Button)(() => ({
  background: 'linear-gradient(to right, var(--red-cross-red), #c81828)',
  color: 'var(--red-cross-white)',
  borderRadius: '30px',
  textTransform: 'none',
  padding: '10px 20px',
  '&:hover': {
    background: 'linear-gradient(to right, #c81828, #a3141f)',
  },
  minWidth: '100px',
}));

// Parse and format bot responses with step-by-step instructions and bullet points
const formatBotResponse = (text) => {
  const lines = text.split('\n');
  const formattedContent = [];

  lines.forEach((line, index) => {
    if (line.match(/^\d+\./)) {
      // If the line starts with a number (e.g., "1. Step")
      formattedContent.push(
        <StepNumber key={`step-${index}`}>{line.trim()}</StepNumber>
      );
    } else if (line.startsWith('-')) {
      // If the line is a bullet point
      formattedContent.push(
        <BulletPoint key={`bullet-${index}`}>
          <BulletIcon /> {line.slice(1).trim()}
        </BulletPoint>
      );
    } else {
      // Regular text
      formattedContent.push(
        <RegularText key={`text-${index}`}>{line.trim()}</RegularText>
      );
    }
  });

  return <>{formattedContent}</>;
};

// Main Chat Page Component
const ChatPage = () => {
  const [emergencyMessages, setEmergencyMessages] = useState([
    {
      id: Date.now(),
      sender: 'bot',
      text: 'I’m your Red Cross Emergency Assistant. First, please provide the patient’s details (age, sex, weight, allergies, medications, and any family medical history). If you haven’t already, call 911 immediately for emergencies.',
    },
  ]);
  const [practiceMessages, setPracticeMessages] = useState([
    {
      id: Date.now(),
      sender: 'bot',
      text: 'Welcome to Practice Mode! I’m here to guide you through first aid and emergency preparedness.',
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [mode, setMode] = useState('practice');
  const messagesEndRef = useRef(null);

  const prompts = {
    emergency: `You are a Red Cross Emergency Assistant. Provide clear, concise, actionable safety instructions.`,
    practice: `You are a Red Cross Practice Assistant. Provide educational and actionable advice.`,
  };

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [emergencyMessages, practiceMessages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { id: Date.now(), sender: 'user', text: input.trim() };
    const setMessages = mode === 'emergency' ? setEmergencyMessages : setPracticeMessages;

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage.text,
          history: mode === 'emergency' ? emergencyMessages : practiceMessages,
          systemPrompt: prompts[mode],
        }),
      });

      if (!response.ok) {
        throw new Error('Server returned an error.');
      }

      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'bot',
          text: data.response || 'Error: No response.',
        },
      ]);
    } catch (error) {
      console.error('Error in chatbot:', error);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'bot',
          text: "Oops! I couldn't process your request. Please try again later.",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleModeChange = (event, newMode) => {
    if (newMode) {
      setMode(newMode);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <ChatContainer>
      <StickyToggleContainer>
        <Typography variant="h6" style={{ fontWeight: 600, marginBottom: '8px' }}>
          {mode === 'emergency' ? 'Emergency Mode' : 'Practice Mode'}
        </Typography>
        <ToggleButtonGroup
          value={mode}
          exclusive
          onChange={handleModeChange}
          aria-label="Mode toggle"
        >
          <ToggleButton value="practice" aria-label="Practice Mode">
            Practice
          </ToggleButton>
          <ToggleButton value="emergency" aria-label="Emergency Mode">
            Emergency
          </ToggleButton>
        </ToggleButtonGroup>
      </StickyToggleContainer>

      <MessagesContainer>
        {(mode === 'emergency' ? emergencyMessages : practiceMessages).map((msg) => (
          <MessageBubble key={msg.id} sender={msg.sender}>
            <div>{msg.sender === 'bot' ? formatBotResponse(msg.text) : msg.text}</div>
          </MessageBubble>
        ))}
        {isTyping && (
          <MessageBubble sender="bot">
            <div>Bot is typing...</div>
          </MessageBubble>
        )}
        <div ref={messagesEndRef}></div>
      </MessagesContainer>

      <InputContainer>
        <TextField
          variant="outlined"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          fullWidth
          InputProps={{
            style: { borderRadius: '30px' },
          }}
        />
        <StyledButton type="submit" disabled={isTyping} onClick={handleSubmit}>
          {isTyping ? <CircularProgress size={24} color="inherit" /> : 'Send'}
        </StyledButton>
      </InputContainer>
    </ChatContainer>
  );
};

export default ChatPage;
