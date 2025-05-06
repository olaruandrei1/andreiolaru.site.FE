import { ScrollNav } from './components/NavBar/NavBar';
import { LayoutWrapper } from './components/Layout/LayoutWrapper';
import {Me} from "./components/Sections/Me/Me.tsx";
import { About } from './components/Sections/About/About.tsx';
import {FullpageWrapper} from "./components/Layout/FullpageWrapper.tsx";
import {useState} from "react";
import {Skills} from "./components/Sections/Skills/Skills.tsx";
import {Education} from "./components/Sections/Education/Education.tsx";
import {Experience} from "./components/Sections/Experience/Experience.tsx";
import {Contact} from "./components/Sections/Contact/Contact.tsx";
import {Projects} from "./components/Sections/Projects/Projects.tsx";

function App() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [disableScroll, setDisableScroll] = useState(false);

    const sections = [
        { id: 'me', label: 'Me', component: <Me /> },
        { id: 'about', label: 'About', component: <About /> },
        { id: 'experience', label: 'Experience', component: <Experience setDisableScroll={setDisableScroll} /> },
        { id: 'skills', label: 'Skills', component: <Skills setDisableScroll={setDisableScroll} /> },
        { id: 'education', label: 'Education', component: <Education /> },
        { id: 'projects', label: 'Projects', component: <Projects /> },
        { id: 'contact', label: 'Contact', component: <Contact /> },
    ];

    return (
        <div className="h-screen w-screen overflow-hidden">
            <LayoutWrapper>
                <ScrollNav
                    sections={sections}
                    activeIndex={activeIndex}
                    setActiveIndex={setActiveIndex}
                    theme="light"
                />
                <FullpageWrapper
                    sections={sections}
                    activeIndex={activeIndex}
                    setActiveIndex={setActiveIndex}
                    disableScroll={disableScroll}
                />
            </LayoutWrapper>
        </div>
    );
}

export default App;
