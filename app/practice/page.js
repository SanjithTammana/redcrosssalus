'use client';

import React, { useState } from 'react';
import {
  Box,
  Container,
  Button,
  Typography,
  Paper,
  RadioGroup,
  Radio,
  FormControlLabel,
  FormControl,
  LinearProgress,
  IconButton,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import questionsData from '/red_cross_practice_questions.json';
import factsData from '/first_aid_facts.json';

// Assume header height from layout.js is 64px
const HEADER_HEIGHT = 64;

// Styled components for consistent styling
const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1),
  padding: theme.spacing(1.5, 4),
  fontSize: '1.1rem',
  backgroundColor: '#ED1B2E',
  color: '#FFFFFF',
  '&:hover': {
    backgroundColor: '#c81828',
  },
}));

const MainContainer = styled(Container)(({ theme, mode }) => ({
  backgroundColor: theme.palette.background.default,
  padding: theme.spacing(4),
  borderRadius: '16px',
  boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.1)',
  width: '100%',
  maxWidth: '800px',
  margin: 'auto',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: mode === 'menu' ? 'center' : 'flex-start',
  overflowY: mode === 'menu' ? 'hidden' : 'auto',
  height: `calc(100vh - ${HEADER_HEIGHT}px)`, // Full height minus header
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'scale(1.02)',
    boxShadow: '0px 16px 32px rgba(0, 0, 0, 0.2)',
  },
}));

const CenteredBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center', // Center content vertically
  textAlign: 'center',
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(2),
  height: '100%', // Take the full height of the parent container
}));


const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  marginBottom: theme.spacing(2),
  borderRadius: '16px',
  boxShadow: 'none',
  maxWidth: '600px',
  width: '100%',
}));

const Flashcard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(6),
  borderRadius: '16px',
  textAlign: 'center',
  cursor: 'pointer',
  userSelect: 'none',
  transition: 'transform 0.3s',
  '&:hover': {
    transform: 'scale(1.02)',
  },
  maxWidth: '600px',
  width: '100%',
}));

const MatchingGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gridTemplateRows: 'repeat(3, 1fr)',
  gap: theme.spacing(2),
  width: '100%',
  flexGrow: 1,
  marginTop: theme.spacing(2),
}));

const PracticePage = () => {
  const [mode, setMode] = useState('menu'); // 'menu', 'test', 'flashcards', 'matching'

  const handleStartTest = () => setMode('test');
  const handleStartFlashcards = () => setMode('flashcards');
  const handleStartMatching = () => setMode('matching');
  const handleExitMode = () => setMode('menu');

  return (
    <MainContainer maxWidth="lg" mode={mode}>
      {mode === 'menu' && (
        <MenuPage
          onStartTest={handleStartTest}
          onStartFlashcards={handleStartFlashcards}
          onStartMatching={handleStartMatching}
        />
      )}
      {mode === 'test' && <TestMode onExit={handleExitMode} />}
      {mode === 'flashcards' && <FlashcardMode onExit={handleExitMode} />}
      {mode === 'matching' && <MatchingGameMode onExit={handleExitMode} />}
    </MainContainer>
  );
};

export default PracticePage;

// Helper function to shuffle an array
const shuffleArray = (array) => {
  const shuffled = array.slice();
  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // Swap elements
  }
  return shuffled;
};

// Menu Page Component
const MenuPage = ({ onStartTest, onStartFlashcards, onStartMatching }) => (
  <CenteredBox sx={{ height: '100%', justifyContent: 'center' }}>
    <Typography variant="h3" gutterBottom style={{ fontWeight: 700 }}>
      Practice First Aid Skills
    </Typography>
    <Typography variant="h6" gutterBottom>
      Choose a mode to get started
    </Typography>
    <Box sx={{ mt: 2 }}>
      <StyledButton variant="contained" onClick={onStartTest}>
        Practice Test
      </StyledButton>
      <StyledButton variant="contained" onClick={onStartFlashcards}>
        Flashcards
      </StyledButton>
      <StyledButton variant="contained" onClick={onStartMatching}>
        Matching Game
      </StyledButton>
    </Box>
  </CenteredBox>
);

// Test Mode Component
const TestMode = ({ onExit }) => {
  const [testQuestions, setTestQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const categories = [...new Set(questionsData.map((q) => q.category))];

  React.useEffect(() => {
    // Generate a test of 30 questions equally distributed among the categories
    const selectedQuestions = [];
    const questionsPerCategory = Math.floor(30 / categories.length);

    categories.forEach((category) => {
      const questionsInCategory = questionsData.filter((q) => q.category === category);
      const shuffledQuestions = shuffleArray(questionsInCategory);
      selectedQuestions.push(...shuffledQuestions.slice(0, questionsPerCategory));
    });

    // If less than 30 questions, add random questions to fill up
    while (selectedQuestions.length < 30) {
      const randomQuestion = questionsData[Math.floor(Math.random() * questionsData.length)];
      if (!selectedQuestions.includes(randomQuestion)) {
        selectedQuestions.push(randomQuestion);
      }
    }

    // Shuffle the final list of selected questions
    const finalTestQuestions = shuffleArray(selectedQuestions);

    setTestQuestions(finalTestQuestions);
  }, []);

  const handleAnswerChange = (questionIndex, choice) => {
    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionIndex]: choice,
    }));
  };

  const handleSubmitTest = () => {
    setShowResults(true);
    setCurrentQuestionIndex(0); // Reset to the first question
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const handlePrevQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
  };

  return (
    <Box sx={{ mt: 4, position: 'relative', width: '100%' }}>
      <IconButton onClick={onExit} sx={{ position: 'absolute', top: 16, right: 16 }}>
        <CloseIcon />
      </IconButton>

      {testQuestions.length > 0 && (
        <>
          <LinearProgress
            variant="determinate"
            value={((currentQuestionIndex + 1) / testQuestions.length) * 100}
            sx={{ mb: 2 }}
          />
          <CenteredBox>
            <StyledPaper>
              <Typography variant="h6" gutterBottom>
                Question {currentQuestionIndex + 1} of {testQuestions.length}
              </Typography>
              <Typography variant="body1" gutterBottom>
                {testQuestions[currentQuestionIndex].question}
              </Typography>
              <FormControl component="fieldset">
                <RadioGroup
                  name={`question-${currentQuestionIndex}`}
                  value={userAnswers[currentQuestionIndex] || ''}
                  onChange={(e) => handleAnswerChange(currentQuestionIndex, e.target.value)}
                  disabled={showResults} // Disable changes after submission
                >
                  {testQuestions[currentQuestionIndex].choices.map((choice, idx) => {
                    const isCorrectChoice = choice === testQuestions[currentQuestionIndex].correct;
                    const isUserChoice = choice === userAnswers[currentQuestionIndex];
                    return (
                      <FormControlLabel
                        key={idx}
                        value={choice}
                        control={<Radio />}
                        label={
                          showResults ? (
                            <Box
                              sx={{
                                color: isCorrectChoice
                                  ? 'green'
                                  : isUserChoice
                                  ? 'red'
                                  : 'inherit',
                              }}
                            >
                              {choice}
                            </Box>
                          ) : (
                            choice
                          )
                        }
                      />
                    );
                  })}
                </RadioGroup>
              </FormControl>
              {showResults && (
                <Typography variant="body2" sx={{ mt: 2 }}>
                  <strong>Explanation:</strong> {testQuestions[currentQuestionIndex].explanation}
                </Typography>
              )}
            </StyledPaper>
            <Box sx={{ mt: 2 }}>
              <StyledButton
                variant="contained"
                onClick={handlePrevQuestion}
                disabled={currentQuestionIndex === 0}
              >
                Previous
              </StyledButton>
              {currentQuestionIndex < testQuestions.length - 1 ? (
                <StyledButton variant="contained" onClick={handleNextQuestion}>
                  Next
                </StyledButton>
              ) : !showResults ? (
                <StyledButton variant="contained" onClick={handleSubmitTest}>
                  Submit Test
                </StyledButton>
              ) : (
                <StyledButton variant="contained" onClick={onExit}>
                  Back to Menu
                </StyledButton>
              )}
            </Box>
            {!showResults && (
              <Box sx={{ mt: 2 }}>
                <StyledButton variant="outlined" onClick={onExit}>
                  Exit to Menu
                </StyledButton>
              </Box>
            )}
          </CenteredBox>
        </>
      )}
    </Box>
  );
};

// Flashcard Mode Component (unchanged)
const FlashcardMode = ({ onExit }) => {
  const [flashcards, setFlashcards] = useState([]);
  const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState(0);
  const [showFlashcardAnswer, setShowFlashcardAnswer] = useState(false);

  React.useEffect(() => {
    const shuffledFlashcards = shuffleArray([...factsData]);
    setFlashcards(shuffledFlashcards);
  }, []);

  const handleFlipFlashcard = () => {
    setShowFlashcardAnswer((prev) => !prev);
  };

  return (
    <CenteredBox>
      <IconButton onClick={onExit} sx={{ position: 'absolute', top: 16, right: 16 }}>
        <CloseIcon />
      </IconButton>
      {flashcards.length > 0 && (
        <>
          <LinearProgress
            variant="determinate"
            value={((currentFlashcardIndex + 1) / flashcards.length) * 100}
            sx={{ mb: 2, width: '100%' }}
          />
          <Typography variant="h6" sx={{ mb: 2 }}>
            Flashcard {currentFlashcardIndex + 1} of {flashcards.length}
          </Typography>
          <Flashcard onClick={handleFlipFlashcard}>
            <Typography variant="h4" sx={{ mt: 2 }}>
              {showFlashcardAnswer
                ? flashcards[currentFlashcardIndex].definition
                : flashcards[currentFlashcardIndex].term}
            </Typography>
            <Typography variant="body1" sx={{ mt: 2, fontStyle: 'italic' }}>
              {showFlashcardAnswer ? 'Tap to see term' : 'Tap to see definition'}
            </Typography>
          </Flashcard>
          <Box sx={{ mt: 2 }}>
            <StyledButton
              variant="contained"
              onClick={() => {
                setShowFlashcardAnswer(false);
                setCurrentFlashcardIndex((prev) => Math.max(prev - 1, 0));
              }}
              disabled={currentFlashcardIndex === 0}
            >
              Previous
            </StyledButton>
            <StyledButton
              variant="contained"
              onClick={() => {
                setShowFlashcardAnswer(false);
                setCurrentFlashcardIndex((prev) => Math.min(prev + 1, flashcards.length - 1));
              }}
              disabled={currentFlashcardIndex === flashcards.length - 1}
            >
              Next
            </StyledButton>
          </Box>
          <Box sx={{ mt: 2 }}>
            <StyledButton variant="outlined" onClick={onExit}>
              Exit to Menu
            </StyledButton>
          </Box>
        </>
      )}
    </CenteredBox>
  );
};

// Matching Game Mode Component (unchanged)
const MatchingGameMode = ({ onExit }) => {
  const [matchingItems, setMatchingItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);

  React.useEffect(() => {
    const shuffledFacts = shuffleArray([...factsData]);
    const pairs = shuffledFacts.slice(0, 6); // Adjusted to 6 pairs for the grid
    const items = pairs.flatMap((pair) => [
      { id: pair.id, content: pair.term, type: 'term' },
      { id: pair.id, content: pair.definition, type: 'definition' },
    ]);
    const scrambledItems = shuffleArray(items).map((item, index) => ({ ...item, key: index }));
    setMatchingItems(scrambledItems);
  }, []);

  const handleSelectItem = (item) => {
    if (matchedPairs.find((matchedItem) => matchedItem.key === item.key)) {
      // Already matched
      return;
    }
    if (selectedItems.length === 0) {
      setSelectedItems([item]);
    } else if (selectedItems.length === 1) {
      const firstItem = selectedItems[0];
      if (firstItem.id === item.id && firstItem.type !== item.type) {
        // Correct match
        setMatchedPairs((prev) => [...prev, firstItem, item]);
        setSelectedItems([]);
      } else {
        // Incorrect match
        setSelectedItems([item]);
      }
    }
  };

  return (
    <Box
      sx={{
        position: 'relative',
        mt: 2,
        minHeight: `calc(100vh - ${HEADER_HEIGHT}px)`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <IconButton onClick={onExit} sx={{ position: 'absolute', top: 16, right: 16 }}>
        <CloseIcon />
      </IconButton>
      <Typography variant="h4" gutterBottom style={{ fontWeight: 700 }}>
        Matching Game
      </Typography>
      <Typography variant="body1" gutterBottom>
        Match the terms with their correct definitions.
      </Typography>
      <MatchingGrid>
        {matchingItems.map((item) => {
          const isSelected = selectedItems.some((selected) => selected.key === item.key);
          const isMatched = matchedPairs.some((matched) => matched.key === item.key);

          return (
            <Box
              key={item.key}
              onClick={() => handleSelectItem(item)}
              sx={{
                cursor: isMatched ? 'default' : 'pointer',
                backgroundColor: isMatched
                  ? '#d4edda'
                  : isSelected
                  ? '#ffeeba'
                  : 'background.paper',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                padding: 2,
                borderRadius: '8px',
                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                width: '100%',
                height: '100%',
              }}
            >
              <Typography variant="body1">{item.content}</Typography>
            </Box>
          );
        })}
      </MatchingGrid>
      {matchedPairs.length === matchingItems.length && (
        <Box sx={{ textAlign: 'center', mt: 2 }}>
          <Typography variant="h5" gutterBottom>
            Great job! You&apos;ve matched all pairs.
          </Typography>
          <StyledButton variant="contained" onClick={onExit}>
            Back to Menu
          </StyledButton>
        </Box>
      )}
    </Box>
  );
};
