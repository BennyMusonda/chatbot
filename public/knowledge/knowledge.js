// ============================================
// MESSENGER AI - OFFLINE KNOWLEDGE BASE
// ============================================

// Each entry contains keywords and an answer.
// Messenger AI searches these entries when offline.

const knowledgeBase = [

    // ========================================
    // GENERAL KNOWLEDGE
    // ========================================

    {
        keywords: ["hello", "hi", "hey", "greetings"],
        answer: "Hello! Welcome to Messenger AI. How can I help you today?"
    },

    {
        keywords: ["who are you", "your name", "what are you"],
        answer: "I am Messenger AI, a chatbot created by Benny. I'm designed to communicate, answer questions and help people learn."
    },

    {
        keywords: ["who created you", "your creator", "who made you"],
        answer: "I was created by Benny, a technology enthusiast interested in web development and artificial intelligence."
    },

    {
        keywords: ["how are you", "how are you doing"],
        answer: "I'm doing great! Thanks for asking. How are you doing today?"
    },

    {
        keywords: ["what can you do", "your abilities", "what are your abilities"],
        answer: "I can answer basic questions, explain technology, help with programming concepts, perform calculations and remember some information you share with me."
    },

    {
        keywords: ["thank you", "thanks"],
        answer: "You're welcome! I'm always happy to help."
    },

    {
        keywords: ["goodbye", "bye", "see you later"],
        answer: "Goodbye! It was nice chatting with you. Come back anytime!"
    },


    // ========================================
    // COMPUTER FUNDAMENTALS
    // ========================================

    {
        keywords: ["what is a computer", "define computer"],
        answer: "A computer is an electronic device that receives data, processes it according to instructions, stores information and produces useful results."
    },

    {
        keywords: ["what is hardware", "define hardware"],
        answer: "Hardware refers to the physical components of a computer that you can touch. Examples include the keyboard, monitor, processor, motherboard and mouse."
    },

    {
        keywords: ["what is software", "define software"],
        answer: "Software refers to programs and instructions that tell a computer what to do. Examples include Windows, Google Chrome, Microsoft Word and computer games."
    },

    {
        keywords: ["what is an operating system", "define operating system"],
        answer: "An operating system is software that manages computer hardware and software resources. Examples include Windows, Linux, macOS and Android."
    },

    {
        keywords: ["what is cpu", "what does cpu mean", "define cpu"],
        answer: "CPU stands for Central Processing Unit. It is responsible for executing instructions and performing calculations inside a computer."
    },

    {
        keywords: ["what is ram", "define ram"],
        answer: "RAM stands for Random Access Memory. It temporarily stores data that the computer is actively using. Information in ordinary RAM is generally lost when power is switched off."
    },

    {
        keywords: ["what is rom", "define rom"],
        answer: "ROM stands for Read-Only Memory. It is non-volatile memory used to store information that needs to remain available when power is switched off."
    },


    // ========================================
    // INTERNET AND NETWORKING
    // ========================================

    {
        keywords: ["what is internet", "define internet"],
        answer: "The internet is a worldwide network of interconnected computers and devices that communicate using standard networking protocols."
    },

    {
        keywords: ["what is website", "define website"],
        answer: "A website is a collection of related web pages that are usually accessible through a common domain name using a web browser."
    },

    {
        keywords: ["what is browser", "web browser"],
        answer: "A web browser is software used to access and view websites. Examples include Google Chrome, Mozilla Firefox, Microsoft Edge and Safari."
    },

    {
        keywords: ["what is ip address", "define ip address"],
        answer: "An IP address is a numerical address used to identify a device or network interface on an IP network. It helps devices communicate with each other."
    },

    {
        keywords: ["what is wifi", "define wifi"],
        answer: "Wi-Fi is a wireless networking technology that allows compatible devices to connect to a local network without using physical network cables."
    },

    {
        keywords: ["what is server", "define server"],
        answer: "A server is a computer or software system that provides services, resources or data to other computers called clients."
    },


    // ========================================
    // HTML
    // ========================================

    {
        keywords: ["what is html", "define html"],
        answer: "HTML stands for HyperText Markup Language. It is the standard markup language used to structure content on web pages. It defines elements such as headings, paragraphs, images, links and forms."
    },

    {
        keywords: ["what is html tag", "html tags"],
        answer: "HTML tags are keywords enclosed in angle brackets that define elements on a webpage. Examples include <h1>, <p>, <div> and <img>."
    },

    {
        keywords: ["what is div", "html div"],
        answer: "The HTML div element is a container used to group other HTML elements. Developers commonly use it to organise page layouts and apply CSS styling."
    },

    {
        keywords: ["what is semantic html", "semantic elements"],
        answer: "Semantic HTML uses meaningful elements that describe their purpose. Examples include header, nav, main, article, section and footer. Semantic elements improve accessibility and code organisation."
    },


    // ========================================
    // CSS
    // ========================================

    {
        keywords: ["what is css", "define css"],
        answer: "CSS stands for Cascading Style Sheets. It controls the appearance and layout of web pages, including colours, fonts, spacing, borders and responsive designs."
    },

    {
        keywords: ["what is flexbox", "css flexbox"],
        answer: "Flexbox is a CSS layout system used to arrange elements in rows or columns. It makes it easier to align, distribute and organise elements inside a container."
    },

    {
        keywords: ["what is grid", "css grid"],
        answer: "CSS Grid is a two-dimensional layout system that allows developers to arrange elements into rows and columns."
    },

    {
        keywords: ["what is responsive design", "responsive website"],
        answer: "Responsive web design is an approach that makes websites adapt to different screen sizes, including mobile phones, tablets and desktop computers."
    },


    // ========================================
    // JAVASCRIPT
    // ========================================

    {
        keywords: ["what is javascript", "define javascript"],
        answer: "JavaScript is a programming language used to make websites interactive. It can respond to user actions, manipulate HTML elements, validate forms and communicate with servers."
    },

    {
        keywords: ["what is variable", "javascript variable"],
        answer: "A variable is a named storage location used to hold information. JavaScript provides let, const and var for declaring variables."
    },

    {
        keywords: ["what is function", "javascript function"],
        answer: "A function is a reusable block of JavaScript code designed to perform a particular task. You can call a function whenever you need it."
    },

    {
        keywords: ["what is array", "javascript array"],
        answer: "An array is a JavaScript data structure used to store multiple values in an ordered list. For example: const fruits = ['Apple', 'Mango', 'Orange'];"
    },

    {
        keywords: ["what is object", "javascript object"],
        answer: "A JavaScript object stores related information using key-value pairs. For example: const person = { name: 'Benny', age: 25 };"
    },

    {
        keywords: ["what is dom", "document object model"],
        answer: "DOM stands for Document Object Model. It represents an HTML document as a tree of objects that JavaScript can access and modify."
    },

    {
        keywords: ["what is localstorage", "local storage"],
        answer: "LocalStorage is a browser storage feature that allows websites to save small amounts of data on a user's device. The information normally remains available after refreshing or closing the browser."
    },


    // ========================================
    // BACKEND DEVELOPMENT
    // ========================================

    {
        keywords: ["what is backend", "backend development"],
        answer: "Backend development focuses on the server-side functionality of an application. It handles business logic, databases, authentication and communication with the frontend."
    },

    {
        keywords: ["what is nodejs", "what is node js"],
        answer: "Node.js is a JavaScript runtime that allows developers to execute JavaScript outside the browser, commonly for building servers and backend applications."
    },

    {
        keywords: ["what is express", "express js", "expressjs"],
        answer: "Express.js is a web framework for Node.js. It simplifies creating web servers, defining routes, handling requests and building APIs."
    },

    {
        keywords: ["what is api", "define api"],
        answer: "API stands for Application Programming Interface. It allows different software applications to communicate and exchange information through defined rules."
    },

    {
        keywords: ["what is database", "define database"],
        answer: "A database is an organised collection of information that can be stored, accessed, managed and updated electronically."
    },

    {
        keywords: ["what is mysql", "define mysql"],
        answer: "MySQL is a relational database management system that uses SQL to store, organise and retrieve structured information."
    },


    // ========================================
    // ARTIFICIAL INTELLIGENCE
    // ========================================

    {
        keywords: ["what is artificial intelligence", "define artificial intelligence"],
        answer: "Artificial Intelligence (AI) is a field of computer science focused on creating systems that can perform tasks commonly associated with human intelligence, such as understanding language, recognising patterns and solving problems."
    },

    {
        keywords: ["what is machine learning", "define machine learning"],
        answer: "Machine learning is a branch of artificial intelligence in which computer systems learn patterns from data and use those patterns to make predictions or decisions."
    },

    {
        keywords: ["what is chatbot", "define chatbot"],
        answer: "A chatbot is a computer program designed to communicate with users through text or voice. Some chatbots follow predefined rules, while AI-powered chatbots can generate more flexible responses."
    },

    {
        keywords: ["what is neural network", "define neural network"],
        answer: "A neural network is a machine learning model inspired by the way biological nervous systems process information. It consists of interconnected computational units called neurons."
    },


    // ========================================
    // SECURITY
    // ========================================

    {
        keywords: ["what is cybersecurity", "define cybersecurity"],
        answer: "Cybersecurity is the practice of protecting computers, networks, applications and information from unauthorised access, attacks, damage and theft."
    },

    {
        keywords: ["what is password", "strong password"],
        answer: "A strong password is difficult to guess. Use a long, unique combination of words or characters, avoid personal information and enable multi-factor authentication where available."
    },

    {
        keywords: ["what is phishing", "define phishing"],
        answer: "Phishing is a cyberattack in which criminals use deceptive messages or websites to trick people into revealing sensitive information such as passwords or financial details."
    },


    // ========================================
    // GENERAL HELP
    // ========================================

    {
        keywords: ["help me", "what can i ask", "help"],
        answer: "You can ask me about computers, HTML, CSS, JavaScript, backend development, databases, networking, artificial intelligence and basic technology concepts."
    }

];


// ============================================
// END OF OFFLINE KNOWLEDGE BASE
// ============================================