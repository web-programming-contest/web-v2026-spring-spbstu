import QuestionList from './QuestionList.js'
import questions from './question-answer.json';

function App() {
    return (
        <div className="block-faq">
            <h1>Question? Answers</h1>
            <QuestionList questions = {questions}/>
        </div>
    );
}

export default App;