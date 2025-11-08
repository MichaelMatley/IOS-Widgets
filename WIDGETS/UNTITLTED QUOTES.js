// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: light-gray; icon-glyph: quote-right;
/* ####################################################
READ ME READ ME READ ME READ ME READ ME READ ME READ ME
#######################################################

// #############################################
// ######### PHILOSOPHICAL QUOTES ##############
// #############################################

WIDGET NAME   : PHILOSOPHICAL QUOTES
COLOUR        : 
ICON          :
WIDGET SIZE   : MEDIUM 
VERSION       : V221025
DEVELOPER     : MICHAEL MATLEY
CREDIT        : 

// #############################################
// ############## WHAT & HOW ###################
// #############################################

1. Create a new script in the Scriptable app and paste this code.
2. Add the script as a Medium or Large widget to your iOS Home Screen.
3. The quote will randomly change every time the widget is refreshed (which occurs automatically by iOS, usually every few hours).

// #############################################
// ############## COLOR SCHEMES ################
// #############################################

### BLACKS ###       #000000 #1F2327 #263137 #333333
### DRK GREY ###     #3E3E3E #424242 #444444 #4A4A4A
### MED GRAY ###     #5A6A7C #7C8C9C #909090 #AAB4C0  
### LGT GREY ###     #D8D8D8 #DDDDDD #E0E0E0 #EAEAEA 
### WHITES ###       #D7E6E6 #F9F9F9 #FFFFFF 
### B/G ACNTS ###    #1A1F2A #3C494F #2C3444 #3E4A5C  
### YLLW ACNTS ###   #FFEE8C #FFDE21 #FFD700 
### TEAL ACNTS ###   #00637C #008794 #40E0DO 
### TEAL SCDRY ###   #55D5D9 #2E9CAA #0D4D53

// #############################################
// ############## CONTENTS #####################
// #############################################
    READ ME 
    USER CONFIGURATION
    QUOTE BANK 
    CORE LOGIC
    LOGIC FUNCTION
    END OF SCRIPT
*/
// #############################################
// ############# USER CONFIGURATION ############
// #############################################

const bgBack = [Color.dynamic(new Color('#1C1C1E'),new Color('#424242')),Color.dynamic(new Color('333333'),new Color('#444444'))];
const bgGrad = [0.0, 1.0];

const accMedium = Color.dynamic(new Color('#40E0D0'),new Color('#008794'));
const lightText = Color.dynamic(new Color('#FFFFFF'),new Color('#909090'));
const brightText = Color.dynamic(new Color('#D7E6E6'),new Color('#EAEAEA'));

const CONFIG = {
    COLORS: {
        DARK_CARD: "333333",},
    TITLE: "A   M O M E N T S   I N S I G H T",
    SUBTITLE: "WORDS OF WISDOM", // Using the user's specified subtitle label
    FONT_SIZE: 18,
    AFONT_SIZE: 14,
    MAX_LINES: 5,};

// ####################################################
// ################## QUOTE BANK ######################
// ####################################################

const QUOTES = [
    { text: "The greatest enemy of knowledge is not ignorance, it is the illusion of knowledge.", author: "Stephen Hawking" },
    { text: "Judge a man by his questions rather than by his answers.", author: "Voltaire" },
    { text: "He who has a why to live can bear almost any how.", author: "Friedrich Nietzsche" },
    { text: "The only way to deal with an unfree world is to become so absolutely free that your very existence is an act of rebellion.", author: "Albert Camus" },
    { text: "The only true wisdom is in knowing you know nothing.", author: "Socrates" },
    { text: "It is better to be a human being dissatisfied than a pig satisfied; better to be Socrates dissatisfied than a fool satisfied.", author: "John Stuart Mill" },
    { text: "Man is condemned to be free; because once thrown into the world, he is responsible for everything he does.", author: "Jean-Paul Sartre" },
    { text: "The reasonable man adapts himself to the world; the unreasonable one persists in trying to adapt the world to himself.", author: "George Bernard Shaw" },
    { text: "Whereof one cannot speak, thereof one must be silent.", author: "Ludwig Wittgenstein" },
    { text: "Happiness is not something readymade. It comes from your own actions.", author: "Dalai Lama XIV" },
    { text: "If you want to know what a man’s like, take a good look at how he treats his inferiors, not his equals.", author: "J.K. Rowling" },
    { text: "All that is gold does not glitter, not all those who wander are lost.", author: "J.R.R. Tolkien" },
    { text: "Have no fear of perfection, you'll never reach it.", author: "Salvador Dalí" },
    { text: "Insanity is doing the same thing over and over again and expecting different results.", author: "Rita Mae Brown" },
    { text: "The past has no power over the present moment.", author: "Eckhart Tolle" },
    { text: "If you cannot be a poet, be the poem.", author: "David Carradine" },
    { text: "Do not wait to strike till the iron is hot; but make the iron hot by striking.", author: "William Butler Yeats" },
    { text: "The only thing necessary for the triumph of evil is for good men to do nothing.", author: "Edmund Burke" },
    { text: "Doubt is not a pleasant condition, but absurdity is the worst of all.", author: "Voltaire" },
    { text: "That which does not kill us makes us stronger.", author: "Friedrich Nietzsche" },
    { text: "We suffer more often in imagination than in reality.", author: "Seneca" },
    { text: "The mass of men lead lives of quiet desperation.", author: "Henry David Thoreau" },
    { text: "Life is a tragedy when seen in close-up, but a comedy in long-shot.", author: "Charlie Chaplin" },
    { text: "Don't tell me the moon is shining; show me the glint of light on broken glass.", author: "Anton Chekhov" },
    { text: "Freedom is secured not by the fulfilling of one's desires, but by the removal of one's desires.", author: "Epictetus" },
    { text: "Reality is merely an illusion, albeit a very persistent one.", author: "Albert Einstein" },
    { text: "The trouble with the world is that the stupid are cocksure and the intelligent are full of doubt.", author: "Bertrand Russell" },
    { text: "The greatest discovery of all time is that a human can alter his future by merely altering his attitude.", author: "Oprah Winfrey" },
    { text: "It is fatal to enter any war without the will to win it.", author: "Douglas MacArthur" },
    { text: "I have not failed. I've just found 10,000 ways that won't work.", author: "Thomas A. Edison" },
    { text: "Never discourage anyone who constantly makes progress, no matter how slow.", author: "Plato" },
    { text: "The mind is everything. What you think you become.", author: "Buddha" },
    { text: "An unexamined life is not worth living.", author: "Socrates" },
    { text: "Do not fear to be eccentric in opinion, for every opinion now accepted was once eccentric.", author: "Bertrand Russell" },
    { text: "We are what we pretend to be, so we must be careful about what we pretend to be.", author: "Kurt Vonnegut" },
    { text: "You can discover more about a person in an hour of play than in a year of conversation.", author: "Plato" },
    { text: "The best revenge is massive success.", author: "Frank Sinatra" },
    { text: "There is only one corner of the universe you can be certain of improving, and that's your own self.", author: "Aldous Huxley" },
    { text: "The only true wisdom is knowing that you know nothing.", author: "Socrates" },
    { text: "Be who you are and say what you feel, because those who mind don't matter, and those who matter don't mind.", author: "Bernard M. Baruch" },
    { text: "When you look long into an abyss, the abyss also looks into you.", author: "Friedrich Nietzsche" },
    { text: "Nothing exists except atoms and empty space; everything else is opinion.", author: "Democritus" },
    { text: "A life spent making mistakes is not only more honourable, but more useful than a life spent doing nothing.", author: "George Bernard Shaw" },
    { text: "There is no road to happiness; happiness is the road.", author: "Thich Nhat Hanh" },
    { text: "Man is the only creature who refuses to be what he is.", author: "Albert Camus" },
    { text: "Beware of the man who does not return your blow: he neither forgives you nor allows you to forgive yourself.", author: "George Bernard Shaw" },
    { text: "The unexamined life is not worth living.", author: "Plato" },
    { text: "In order to be irreplaceable one must always be different.", author: "Coco Chanel" },
    { text: "You have power over your mind - not outside events. Realise this, and you will find strength.", author: "Marcus Aurelius" },
    { text: "Change the way you look at things and the things you look at change.", author: "Wayne Dyer" },
    { text: "The only source of knowledge is experience.", author: "Albert Einstein" }
];

    const BGGRADIENT = new LinearGradient()
    BGGRADIENT.colors = bgBack
    BGGRADIENT.locations = bgGrad

// ####################################################
// ################## CORE LOGIC ######################
// ####################################################

async function createWidget(quote) {
    // 1. Setup the main container (The Card)
    let w = new ListWidget();
    w.backgroundGradient = BGGRADIENT;
    w.setPadding(12, 14, 4, 20); // Standard padding for a clean look
    // 2. Top Title "A Moment's Insight"
    let titleStack = w.addStack();
    titleStack.addSpacer(); // Ensures stack takes full width
    let titleText = titleStack.addText(CONFIG.TITLE);
    titleText.textColor = lightText; 
    titleText.font = Font.systemFont(12);
    w.addSpacer(4); // Small space after title
    // 3. Subtitle/Header 
    let contentStack = w.addStack();
    contentStack.layoutVertically();
    let subtitle = contentStack.addText(CONFIG.SUBTITLE);
    subtitle.textColor = accMedium;
    subtitle.font = Font.semiboldSystemFont(10);
    
    contentStack.addSpacer(14); 
    // 4. The Quote Content
    let quoteFullText = quote.text
    let quoteText = contentStack.addText(quoteFullText);
    quoteText.textColor = brightText;
    quoteText.font = Font.italicSystemFont(CONFIG.FONT_SIZE);
    quoteText.lineLimit = CONFIG.MAX_LINES; 
    
    contentStack.addSpacer(14); 
    
    // 5. The Author Content
    let authorFullText = quote.author
    let authorText = contentStack.addText(authorFullText);
    authorText.textColor = lightText;
    authorText.font = Font.boldSystemFont(CONFIG.AFONT_SIZE);
    authorText.lineLimit = CONFIG.MAX_LINES; 
    
    w.addSpacer(); 

    return w;}

// ####################################################
// ################ LOGIC FUNCTION ####################
// ####################################################

function getRandomQuote() {
    let index = Math.floor(Math.random() * QUOTES.length);
    return QUOTES[index];}

// ####################################################
// ################## EXECUTION #######################
// ####################################################

let selectedQuote = getRandomQuote();

// Check if the script is running inside a widget, and if so, render the widget.
if (config.runsInWidget) {
    let widget = await createWidget(selectedQuote);
    Script.setWidget(widget);
    Script.complete();
} else {
    let widget = await createWidget(selectedQuote);
    widget.presentMedium(); // Present a medium preview by default
    Script.complete();}

// #############################################
// ############## END OF SCRIPT ################
// #############################################