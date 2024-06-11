import {React,useEffect,useState} from 'react';
import './Home.css';
// import backgroundImage from './index.jpeg';


const Home = () => {
    const [animatedText, setAnimatedText] = useState('');
    const [animatedText2, setAnimatedText2] = useState('');
    const sentence2 = "WWelcome to our App Algo-Ace! Search for coding problems, solve them using our online compiler, and get instant feedback on your solutions. Track your progress and improve your programming skills. Register or login to get started!";
    const sentence = "WWelcome to Algo-Ace!";
    const letters2 = sentence2.split("");
    const letters = sentence.split("");
    
    useEffect(() => {
        let index = 0;
        const intervalId = setInterval(() => {
            if (index === sentence.length-1) clearInterval(intervalId);
            else {
                setAnimatedText(prevText => prevText + letters[index]);
                index++;
            }
        }, 200); // Adjust the speed of typing here (in milliseconds)

        return () => clearInterval(intervalId); // Cleanup function to clear the interval
    }, []);
    useEffect(() => {
        let index = 0;
        const intervalId = setInterval(() => {
            if (index === sentence2.length-1) clearInterval(intervalId);
            else {
                setAnimatedText2(prevText => prevText + letters2[index]);
                index++;
            }
        }, 30); // Adjust the speed of typing here (in milliseconds)

        return () => clearInterval(intervalId); // Cleanup function to clear the interval
    }, []);
    return (
        <div className="home-container" >
            <div className="home-content">
                <h1 className="welcome-message"> {animatedText.split(" ").map((word, i) => (
                        word === "Algo-Ace!" ? <span key={i} className="highlight">{word}</span> : word + " "
                    ))}</h1>
                <p className='description animated-text'>{animatedText2}</p>
            </div>
            <div className="home-sidebar">
                <div className="home-link">
                    <h2>Get Started</h2>
                    <p><a href="/register">Register</a> or <a href="/login">Login</a> to start solving problems.</p>
                </div>
                <div className="home-link">
                    <h2>Problems</h2>
                    <p><a href="/problems">Browse Problems</a> and test your skills.</p>
                </div>
            </div>
        </div>
    );
}

export default Home;