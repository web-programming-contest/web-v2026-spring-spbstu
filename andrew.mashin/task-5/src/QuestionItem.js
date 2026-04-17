import { useState, useEffect, useRef } from "react";

function QuestionItem({ question, answer }) {
    const [isOpen, setIsOpen] = useState(false);
    const answerRef = useRef(null);
    const [height, setHeight] = useState(0);

    const styleAnimation = {
        height: height,
        opacity: isOpen ? 1 : 0,
        transition: "height 0.3s ease, opacity 0.3s ease",
        overflow: "hidden",
    };

    useEffect(() => {
        if (answerRef.current) {
            setHeight(isOpen ? answerRef.current.scrollHeight : 0);
        }
    }, [isOpen]);

    return <div className="question-answer" onClick={() => setIsOpen(!isOpen)}>
        <div className="question">
            <p>{question}</p>
            <svg className={isOpen ? 'open' : ''} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="18 15 12 9 6 15"></polyline>
            </svg>
        </div>
        <div ref={answerRef} className={`answer${isOpen ? ' open' : ''}`} style={styleAnimation}>
            <p>{answer}</p>
        </div>
    </div>
}

export default QuestionItem;