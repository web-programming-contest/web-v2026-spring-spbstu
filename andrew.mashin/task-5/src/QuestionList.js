import QuestionItem from './QuestionItem';

function QuestionList({ questions }) {
    const tags = questions.map((element, index) => {
        return <QuestionItem
            key = {index}
            question = {element.question}
            answer = {element.answer}
        />
    });

    return <div className='question-answer-block'>{tags}</div>    
}

export default QuestionList;