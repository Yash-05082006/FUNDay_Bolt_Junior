import { Module, Game, Achievement, Badge } from '../types';

export const modules: Module[] = [
  {
    id: 1,
    title: "Insurance Adventure",
    theme: "Pet Adventure",
    description: "Join Milo the dog and Tutu the cat on their magical jungle quest!",
    storyline: "🐕 Milo the brave dog and 🐱 Tutu the clever cat are on an epic mission to collect golden bones in the mysterious Jungle of Wonders! But wait - the jungle is full of falling coconuts 🥥, sneaky snakes 🐍, and tricky traps! Our furry heroes need magical protection shields (insurance) to stay safe on their adventure. Will they be smart enough to get protected before venturing into danger?",
    videoUrl: "https://www.renderforest.com/watch-102683332?quality=0",
    concepts: ["Protection", "Risk Management", "Pet Safety", "Planning Ahead", "Insurance Benefits"],
    quiz: {
      id: "quiz-1",
      questions: [
        {
          id: "q1-1",
          type: "multiple-choice",
          question: "🤔 Why did Milo and Tutu need insurance before entering the jungle?",
          options: [
            "To look cool in front of other animals",
            "To protect themselves from jungle dangers",
            "Because the jungle entrance required it",
            "To get a discount on golden bones"
          ],
          correctAnswer: "To protect themselves from jungle dangers",
          points: 10,
          explanation: "🛡️ That's right! Insurance is like a superhero shield that protects us from unexpected dangers and helps us feel safe during adventures!"
        },
        {
          id: "q1-2",
          type: "multiple-choice",
          question: "🥥 What jungle dangers did the insurance protect them from?",
          options: [
            "Getting lost in the jungle",
            "Falling coconuts and sneaky snakes",
            "Running out of snacks",
            "Forgetting their way home"
          ],
          correctAnswer: "Falling coconuts and sneaky snakes",
          points: 10,
          explanation: "🎯 Exactly! Insurance protects us from specific risks and dangers that could hurt us or cost us money to fix!"
        },
        {
          id: "q1-3",
          type: "multiple-choice",
          question: "😰 What would happen if Milo and Tutu didn't buy insurance?",
          options: [
            "They would have more golden bones",
            "They could get hurt and pay lots of money for treatment",
            "Nothing would change",
            "They would run faster"
          ],
          correctAnswer: "They could get hurt and pay lots of money for treatment",
          points: 10,
          explanation: "💡 Smart thinking! Without insurance, they would have to pay all the costs themselves if something bad happened - that could be very expensive!"
        },
        {
          id: "q1-4",
          type: "multiple-choice",
          question: "🧙‍♂️ Who gave Milo and Tutu their magical protection?",
          options: [
            "The Wise Insurance Wizard",
            "Their jungle guide",
            "A friendly monkey",
            "They found it themselves"
          ],
          correctAnswer: "The Wise Insurance Wizard",
          points: 10,
          explanation: "✨ Perfect! The Insurance Wizard represents insurance companies that provide protection in exchange for small regular payments!"
        },
        {
          id: "q1-5",
          type: "multiple-choice",
          question: "💰 What's the benefit of paying a small amount regularly for insurance?",
          options: [
            "You get golden bones every month",
            "You get big protection for small payments",
            "You become stronger",
            "You can skip jungle dangers"
          ],
          correctAnswer: "You get big protection for small payments",
          points: 10,
          explanation: "🌟 Brilliant! Insurance lets you pay a little bit regularly to get huge protection when you really need it - it's like magic!"
        }
      ],
      totalScore: 50,
      completed: false
    },
    completed: false,
    stars: 0
  },
  {
    id: 2,
    title: "Superhero Investments",
    theme: "Superhero World",
    description: "Discover the power of PMS & AIF with Captain Portfolio and Fund Girl!",
    storyline: "🦸‍♂️ Meet Captain Portfolio and 🦸‍♀️ Fund Girl, the dynamic duo of Investment City! They have special powers that help regular people grow their money safely. Captain Portfolio uses his PMS (Portfolio Management Service) powers to create custom investment plans, while Fund Girl uses her AIF (Alternative Investment Fund) abilities to find unique investment opportunities. Together, they teach young heroes how to make their money work harder and smarter!",
    videoUrl: "https://www.renderforest.com/watch-103566093?quality=0&queue=152152154",
    concepts: ["Portfolio Management", "Investment Funds", "Risk Distribution", "Professional Management", "Diversification"],
    quiz: {
      id: "quiz-2",
      questions: [
        {
          id: "q2-1",
          type: "multiple-choice",
          question: "🦸‍♂️ What special power does Captain Portfolio have?",
          options: [
            "He can fly really fast",
            "He creates custom investment plans (PMS)",
            "He can see through walls",
            "He controls the weather"
          ],
          correctAnswer: "He creates custom investment plans (PMS)",
          points: 10,
          explanation: "💪 Awesome! Captain Portfolio's PMS power helps create personalized investment strategies just like a tailor makes custom clothes!"
        },
        {
          id: "q2-2",
          type: "multiple-choice",
          question: "🦸‍♀️ What makes Fund Girl's AIF powers special?",
          options: [
            "She finds unique investment opportunities",
            "She can turn invisible",
            "She controls time",
            "She reads minds"
          ],
          correctAnswer: "She finds unique investment opportunities",
          points: 10,
          explanation: "🎯 Perfect! Fund Girl's AIF powers help find special investment opportunities that regular people might not know about!"
        },
        {
          id: "q2-3",
          type: "multiple-choice",
          question: "🤝 Why do Captain Portfolio and Fund Girl work together?",
          options: [
            "They are best friends",
            "They combine different investment strategies for better results",
            "They live in the same building",
            "They have the same costume designer"
          ],
          correctAnswer: "They combine different investment strategies for better results",
          points: 10,
          explanation: "🌟 Brilliant! Working together gives investors more options and better ways to grow their money safely!"
        },
        {
          id: "q2-4",
          type: "multiple-choice",
          question: "🎯 What does 'diversification' mean in superhero terms?",
          options: [
            "Having different colored costumes",
            "Spreading investments across different areas like having multiple superpowers",
            "Flying in different directions",
            "Fighting different villains"
          ],
          correctAnswer: "Spreading investments across different areas like having multiple superpowers",
          points: 10,
          explanation: "🚀 Excellent! Just like superheroes are stronger with multiple powers, investments are safer when spread across different areas!"
        },
        {
          id: "q2-5",
          type: "multiple-choice",
          question: "💡 Who should consider using PMS and AIF services?",
          options: [
            "Only superheroes",
            "People who want professional help growing their money",
            "Only people who live in Investment City",
            "Only people with superpowers"
          ],
          correctAnswer: "People who want professional help growing their money",
          points: 10,
          explanation: "🏆 Outstanding! Anyone who wants expert help managing their investments can benefit from these professional services!"
        }
      ],
      totalScore: 50,
      completed: false
    },
    completed: false,
    stars: 0
  },
  {
    id: 3,
    title: "Stock Market Safari",
    theme: "Safari Adventure",
    description: "Explore the wild world of stocks with Safari Guide Sam!",
    storyline: "🦁 Welcome to the Stock Market Safari! Safari Guide Sam is taking young explorers on an exciting journey through the Investment Jungle. Here, companies are like different animals - some are strong lions (blue-chip stocks), some are fast cheetahs (growth stocks), and some are steady elephants (dividend stocks). Sam teaches how buying stocks means owning a tiny piece of these amazing 'company animals' and watching them grow over time!",
    videoUrl: "https://www.renderforest.com/watch-104132549?quality=0",
    concepts: ["Stock Ownership", "Company Shares", "Market Growth", "Investment Basics", "Risk and Reward"],
    quiz: {
      id: "quiz-3",
      questions: [
        {
          id: "q3-1",
          type: "multiple-choice",
          question: "🦁 What does Safari Guide Sam compare stocks to?",
          options: [
            "Different types of trees",
            "Different animals in the jungle",
            "Different types of food",
            "Different weather patterns"
          ],
          correctAnswer: "Different animals in the jungle",
          points: 10,
          explanation: "🎯 Perfect! Sam uses animals to help kids understand different types of stocks and their characteristics!"
        },
        {
          id: "q3-2",
          type: "multiple-choice",
          question: "🐘 What do steady elephants represent in the stock safari?",
          options: [
            "Risky investments",
            "Dividend stocks that pay regular income",
            "Companies that are going out of business",
            "Stocks that never change price"
          ],
          correctAnswer: "Dividend stocks that pay regular income",
          points: 10,
          explanation: "🌟 Excellent! Elephants are steady and reliable, just like dividend stocks that pay regular income to investors!"
        },
        {
          id: "q3-3",
          type: "multiple-choice",
          question: "🐆 What does buying a stock mean?",
          options: [
            "You become the boss of the company",
            "You own a tiny piece of the company",
            "You get free products from the company",
            "You can tell the company what to do"
          ],
          correctAnswer: "You own a tiny piece of the company",
          points: 10,
          explanation: "💡 Great job! When you buy stock, you become a part-owner of that company, even if it's just a tiny piece!"
        },
        {
          id: "q3-4",
          type: "multiple-choice",
          question: "🚀 What are fast cheetahs in the stock safari?",
          options: [
            "Stocks that never lose money",
            "Growth stocks that can increase quickly in value",
            "Stocks that are too expensive",
            "Companies that sell running shoes"
          ],
          correctAnswer: "Growth stocks that can increase quickly in value",
          points: 10,
          explanation: "🏆 Outstanding! Cheetahs are fast, just like growth stocks that can grow quickly but might also be more risky!"
        },
        {
          id: "q3-5",
          type: "multiple-choice",
          question: "🌱 Why does Safari Guide Sam say patience is important in stock investing?",
          options: [
            "Because stocks are boring",
            "Because companies grow and become more valuable over time",
            "Because you have to wait in long lines",
            "Because the stock market is closed on weekends"
          ],
          correctAnswer: "Because companies grow and become more valuable over time",
          points: 10,
          explanation: "🚀 Brilliant! Just like animals grow in the wild, companies can grow over time, making your investment more valuable!"
        }
      ],
      totalScore: 50,
      completed: false
    },
    completed: false,
    stars: 0
  },
  {
    id: 4,
    title: "Bond Bridge Adventure",
    theme: "Bridge Building",
    description: "Build strong financial bridges with Engineer Bond and learn about lending money!",
    storyline: "🌉 Meet Engineer Bond, the master bridge builder of Finance Valley! She's on a mission to connect two cities by building the strongest bridge ever. But here's the twist - she needs to borrow money from the townspeople to buy materials. In return, she promises to pay them back with extra money (interest) over time. The townspeople become 'bond holders' who lend money and get steady payments. Join Engineer Bond to learn how bonds work like IOUs that help build amazing things!",
    videoUrl: "https://www.renderforest.com/watch-104134175?quality=0",
    concepts: ["Lending Money", "Interest Payments", "Fixed Income", "Government Bonds", "Corporate Bonds"],
    quiz: {
      id: "quiz-4",
      questions: [
        {
          id: "q4-1",
          type: "multiple-choice",
          question: "🌉 What does Engineer Bond need from the townspeople?",
          options: [
            "Help carrying heavy materials",
            "Money to borrow for building the bridge",
            "Advice on bridge design",
            "Permission to build the bridge"
          ],
          correctAnswer: "Money to borrow for building the bridge",
          points: 10,
          explanation: "🎯 Perfect! Engineer Bond needs to borrow money, and bonds are a way for organizations to borrow from many people!"
        },
        {
          id: "q4-2",
          type: "multiple-choice",
          question: "💰 What does Engineer Bond promise to the people who lend money?",
          options: [
            "Free bridge crossings forever",
            "To pay them back with extra money (interest)",
            "A piece of the bridge",
            "A job building bridges"
          ],
          correctAnswer: "To pay them back with extra money (interest)",
          points: 10,
          explanation: "🌟 Excellent! Bond holders lend money and get paid back the original amount plus interest over time!"
        },
        {
          id: "q4-3",
          type: "multiple-choice",
          question: "📋 What are the townspeople called when they lend money?",
          options: [
            "Bridge builders",
            "Bond holders",
            "City mayors",
            "Construction workers"
          ],
          correctAnswer: "Bond holders",
          points: 10,
          explanation: "💡 Great job! When you buy a bond, you become a bond holder - someone who has lent money and will receive payments!"
        },
        {
          id: "q4-4",
          type: "multiple-choice",
          question: "🔄 How are bonds like IOUs?",
          options: [
            "They're both written on paper",
            "They're both promises to pay back money",
            "They're both signed by engineers",
            "They're both used for building bridges"
          ],
          correctAnswer: "They're both promises to pay back money",
          points: 10,
          explanation: "🏆 Outstanding! Bonds are like formal IOUs - written promises to pay back borrowed money with interest!"
        },
        {
          id: "q4-5",
          type: "multiple-choice",
          question: "🏗️ What good things can bonds help build?",
          options: [
            "Only bridges",
            "Schools, hospitals, roads, and other important projects",
            "Only things that engineers design",
            "Only things in Finance Valley"
          ],
          correctAnswer: "Schools, hospitals, roads, and other important projects",
          points: 10,
          explanation: "🚀 Brilliant! Bonds help fund many important projects that benefit everyone - from schools to hospitals to infrastructure!"
        }
      ],
      totalScore: 50,
      completed: false
    },
    completed: false,
    stars: 0
  },
  {
    id: 5,
    title: "Equity Kingdom",
    theme: "Medieval Kingdom",
    description: "Learn about equity and ownership with King Equity and Queen Share!",
    storyline: "👑 In the magnificent Equity Kingdom, King Equity and Queen Share rule with fairness and wisdom! They teach young knights about ownership and how having 'equity' means owning a piece of something valuable. When the kingdom builds new castles, bridges, or markets, citizens can buy shares and become part-owners. The more shares you own, the bigger your piece of the kingdom! Join the royal court to learn how equity makes everyone a partner in success!",
    videoUrl: "https://www.renderforest.com/watch-104133364?quality=0",
    concepts: ["Ownership Rights", "Equity Shares", "Proportional Ownership", "Value Creation", "Shareholder Benefits"],
    quiz: {
      id: "quiz-5",
      questions: [
        {
          id: "q5-1",
          type: "multiple-choice",
          question: "👑 What do King Equity and Queen Share teach about?",
          options: [
            "How to build castles",
            "Ownership and having a piece of something valuable",
            "How to become a knight",
            "Royal cooking recipes"
          ],
          correctAnswer: "Ownership and having a piece of something valuable",
          points: 10,
          explanation: "🎯 Perfect! The royal couple teaches that equity means owning a piece of something valuable, like a company or property!"
        },
        {
          id: "q5-2",
          type: "multiple-choice",
          question: "🏰 When the kingdom builds new projects, what can citizens do?",
          options: [
            "Just watch from far away",
            "Buy shares and become part-owners",
            "Complain about the noise",
            "Move to another kingdom"
          ],
          correctAnswer: "Buy shares and become part-owners",
          points: 10,
          explanation: "🌟 Excellent! Citizens can invest in kingdom projects by buying shares, making them part-owners of the success!"
        },
        {
          id: "q5-3",
          type: "multiple-choice",
          question: "📊 What happens when you own more shares?",
          options: [
            "You get a bigger crown",
            "You own a bigger piece of the kingdom",
            "You have to work harder",
            "You pay more taxes"
          ],
          correctAnswer: "You own a bigger piece of the kingdom",
          points: 10,
          explanation: "💡 Great job! The more shares you own, the bigger your ownership stake and potential rewards!"
        },
        {
          id: "q5-4",
          type: "multiple-choice",
          question: "🤝 What does being a 'partner in success' mean?",
          options: [
            "You only get rewards if you work in the castle",
            "When the kingdom does well, shareholders benefit too",
            "You have to share your lunch with everyone",
            "You can only visit the kingdom on weekends"
          ],
          correctAnswer: "When the kingdom does well, shareholders benefit too",
          points: 10,
          explanation: "🏆 Outstanding! When you own equity, you share in the success - if the company does well, your investment grows!"
        },
        {
          id: "q5-5",
          type: "multiple-choice",
          question: "⚖️ Why do King Equity and Queen Share rule with 'fairness'?",
          options: [
            "Because they like the color of justice",
            "Because all shareholders are treated equally based on their ownership",
            "Because they went to fairness school",
            "Because the kingdom law requires it"
          ],
          correctAnswer: "Because all shareholders are treated equally based on their ownership",
          points: 10,
          explanation: "🚀 Brilliant! Equity means fairness - all shareholders get treated fairly based on how much they own!"
        }
      ],
      totalScore: 50,
      completed: false
    },
    completed: false,
    stars: 0
  }
];

export const games: Game[] = [
  {
    id: "game-1",
    title: "Spend Smart Game",
    description: "Learn how spending affects your virtual wallet in this interactive adventure!",
    url: "https://gd.games/games/39da6ea4-76db-44a2-bee7-3dac40f84d40",
    icon: "💳",
    difficulty: "Easy",
    category: "Spending"
  },
  {
    id: "game-2", 
    title: "Financial Football",
    description: "Score goals by answering financial literacy questions - touchdown for your brain!",
    url: "https://www.financialfootball.com/play/",
    icon: "⚽",
    difficulty: "Medium",
    category: "General"
  },
  {
    id: "game-3",
    title: "The Bummer Game", 
    description: "Insurance-based adventure game featuring loveable pet characters and protection strategies!",
    url: "https://thebummergame.com/",
    icon: "🐕",
    difficulty: "Easy",
    category: "Insurance"
  },
  {
    id: "game-4",
    title: "Money Magic",
    description: "Enter a magical world where kids learn to make wise money choices with wizards and spells!",
    url: "https://playmoneymagic.com/",
    icon: "✨",
    difficulty: "Hard",
    category: "General"
  },
  {
    id: "game-5",
    title: "Lights, Camera, Budget!",
    description: "Play the role of a movie producer with a limited budget. Make strategic financial choices to create a successful film!",
    url: "https://www.gpb.org/lights-camera-budget-game/",
    icon: "🎬",
    difficulty: "Medium",
    category: "Budgeting"
  }
];

export const achievements: Achievement[] = [
  {
    id: "first-login",
    title: "Welcome Explorer!",
    description: "Successfully logged into FUNDay-Junior",
    icon: "🎉",
    progress: 0,
    maxProgress: 1,
    unlocked: false
  },
  {
    id: "first-module",
    title: "Learning Champion",
    description: "Complete your first learning module",
    icon: "📚",
    progress: 0,
    maxProgress: 1,
    unlocked: false
  },
  {
    id: "quiz-master",
    title: "Quiz Master",
    description: "Score 100% on any quiz",
    icon: "🏆",
    progress: 0,
    maxProgress: 1,
    unlocked: false
  },
  {
    id: "game-player",
    title: "Game Explorer",
    description: "Play your first educational game",
    icon: "🎮",
    progress: 0,
    maxProgress: 1,
    unlocked: false
  },
  {
    id: "story-lover",
    title: "Story Lover",
    description: "Read all module storylines",
    icon: "📖",
    progress: 0,
    maxProgress: 5,
    unlocked: false
  }
];

export const badges: Badge[] = [
  {
    id: "quiz-champ",
    name: "Quiz Champ",
    icon: "🧠",
    description: "Master of all quizzes - scored perfectly on multiple quizzes!",
    earned: false
  },
  {
    id: "insurance-expert",
    name: "Insurance Expert", 
    icon: "🛡️",
    description: "Protector of the future - learned insurance with Milo and Tutu!",
    earned: false
  },
  {
    id: "investment-genius",
    name: "Investment Genius",
    icon: "💎",
    description: "Discovered the powers of PMS & AIF with superhero investors!",
    earned: false
  },
  {
    id: "stock-safari-explorer",
    name: "Stock Safari Explorer",
    icon: "🦁",
    description: "Explored the wild world of stocks with Safari Guide Sam!",
    earned: false
  },
  {
    id: "bond-builder",
    name: "Bond Builder",
    icon: "🌉",
    description: "Built strong financial bridges with Engineer Bond!",
    earned: false
  },
  {
    id: "equity-knight",
    name: "Equity Knight",
    icon: "👑",
    description: "Learned about ownership and equity in the royal kingdom!",
    earned: false
  },
  {
    id: "story-master",
    name: "Story Master",
    icon: "📚",
    description: "Completed all adventure storylines - a true FUNDay hero!",
    earned: false
  }
];