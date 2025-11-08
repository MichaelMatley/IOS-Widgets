// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: light-gray; icon-glyph: laptop-code;
/* ####################################################
READ ME READ ME READ ME READ ME READ ME READ ME READ ME
#######################################################

// #############################################
// ######### ALGORITHM OF THE DAY ##############
// #############################################

WIDGET NAME   : ALGORITHM OF THE DAY
COLOUR        :
ICON          :
WIDGET SIZE   : MEDIUM 
VERSION       : V061125
DEVELOPER     : MICHAEL MATLEY
CREDIT        : THE ENTIRE FIELD OF SCIENCE

// #############################################
// ######### FUNCTION & INSTRUCTION ############
// #############################################

literally preset to cycle through a algorithm a day to do with machine learning just enable widget and leave it. 
Already set to dynamic colour changing for light and dark mode.

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

// #############################################
// ############## CONTENTS #####################
// #############################################

    READ ME 
    USER CONFIGURATION 
    CORE LOGIC
    WIDGET LAYOUT
    WIDGET EXECUTION
    END OF SCRIPT
*/
// #############################################
// ############## USER CONFIGURATION ###########
// #############################################

const bgBack = [Color.dynamic(new Color('#1C1C1E'), new Color('#424242')), Color.dynamic(new Color('#3E3E3E'), new Color('#444444'))];
const bgGrad = [0.0, 1.0];

const BGGRADIENT = new LinearGradient()
BGGRADIENT.colors = bgBack
BGGRADIENT.locations = bgGrad


const WIDGET_CONFIG = {
    // General Styling
    PADDING: 15, // Padding (Top, Bottom, Left, Right)

    // Title (Algorithm Name)
    TITLE_FONT_TYPE: "BoldSystem", // Options: "boldSystem", "semiboldSystem", "mediumSystem"
    TITLE_FONT_SIZE: 22,
    TITLE_COLOR: new Color("909090"), 

    // 'NEW' Tag Styling
    NEW_TAG_FONT_SIZE: 12,
    NEW_TAG_COLOR: new Color("40E0D0"), 
    NEW_TAG_OPACITY: 0.8,

    // Concept Body Text
    CONCEPT_FONT_TYPE: "semiboldSystem", 
    CONCEPT_FONT_SIZE: 14.0,
    CONCEPT_COLOR: new Color("D8D8D8"),
    CONCEPT_OPACITY: 1.0,
    CONCEPT_LINE_LIMIT: 4, 
    
    // Footer (Concept Count)
    FOOTER_FONT_TYPE: "lightSystem",
    FOOTER_FONT_SIZE: 12,
    FOOTER_COLOR: new Color("40E0D0"),
    FOOTER_OPACITY: 0.7,

    // Error State Styling (in case of data failure)
    ERROR_BG_COLOR: new Color("#8B0000"), // Dark Red
    ERROR_TEXT_COLOR: Color.white(),
    ERROR_TITLE_SIZE: 18,
    ERROR_BODY_SIZE: 12
};

// --- Font Helper Function ---
function getFont(type, size) {
    switch (type) {
        case "boldSystem":
            return Font.boldSystemFont(size);
        case "semiboldSystem":
            return Font.semiboldSystemFont(size);
        case "mediumSystem":
            return Font.mediumSystemFont(size);
        case "lightSystem":
            return Font.lightSystemFont(size);
        default:
            return Font.systemFont(size);}}

// #############################################
// ############## END OF USER CONFIG ###########
// #############################################

// #############################################
// ############## JSON ALOGORITHM ## ###########
// #############################################

function loadAlgorithms() {
    return [
      {
        "name": "Linear Regression",
        "concept": "The foundational supervised method that models the relationship between a scalar dependent variable and one or more explanatory variables using a straight line.",
        "new": false
      },
      {
        "name": "Logistic Regression",
        "concept": "Despite the name, a classification algorithm that uses the logistic function (sigmoid) to estimate probabilities and classify observations into discrete categories.",
        "new": false
      },
      {
        "name": "Ridge Regression",
        "concept": "A regularisation technique that adds an L2 penalty term to the cost function, preventing weights from becoming too large and mitigating multicollinearity.",
        "new": false
      },
      {
        "name": "Lasso Regression",
        "concept": "Employs L1 regularisation, which can drive the coefficients of less important features exactly to zero. Excellent for inherent feature selection.",
        "new": false
      },
      {
        "name": "Decision Tree",
        "concept": "A flow-chart-like model where each internal node represents a feature test and each leaf node holds a decision. Prone to severe overfitting.",
        "new": true
      },
      {
        "name": "K-Nearest Neighbors (KNN)",
        "concept": "A lazy, non-parametric algorithm that classifies a point based on the majority class of its 'K' nearest neighbours in the feature space. Computationally costly at inference.",
        "new": false
      },
      {
        "name": "Naive Bayes",
        "concept": "A probabilistic classifier based on Bayes' theorem. It assumes conditional independence between every pair of features, which is often 'naively' untrue.",
        "new": false
      },
      {
        "name": "Random Forest",
        "concept": "An ensemble method that builds multiple decision trees, where each tree is trained on a different subset of data and features. Reduces the variance of individual trees.",
        "new": false
      },
      {
        "name": "AdaBoost (Adaptive Boosting)",
        "concept": "An iterative boosting method that sequentially trains weak learners, assigning higher weight to the data points that previous models misclassified. Aggressively focused.",
        "new": false
      },
      {
        "name": "Gradient Boosting Machine (GBM)",
        "concept": "Builds an ensemble by training new models to specifically predict the residual errors made by the previous ensemble members. Highly effective, but slow to train.",
        "new": true
      },
      {
        "name": "Support Vector Machine (SVM)",
        "concept": "Finds the optimal hyperplane that maximises the margin between the closest data points (support vectors) of different classes. Uses the 'kernel trick' for non-linear data.",
        "new": false
      },
      {
        "name": "K-Means Clustering",
        "concept": "An unsupervised method that partitions 'N' data points into 'K' clusters. Requires the number of clusters (K) to be specified beforehand, which is often an arbitrary guess.",
        "new": false
      },
      {
        "name": "DBSCAN",
        "concept": "Density-Based Spatial Clustering of Applications with Noise. Groups together points that are closely packed, marking as outliers any points that lie alone in low-density regions. No need for fixed K.",
        "new": true
      },
      {
        "name": "Hierarchical Clustering",
        "concept": "Builds a hierarchy of clusters, either agglomerative (bottom-up) or divisive (top-down). The resulting dendrogram visually represents the data's nested structure.",
        "new": false
      },
      {
        "name": "Principal Component Analysis (PCA)",
        "concept": "A linear dimensionality reduction technique. It projects high-dimensional data onto a lower-dimensional subspace while preserving maximal variance. Data transformation, not selection.",
        "new": false
      },
      {
        "name": "Independent Component Analysis (ICA)",
        "concept": "Separates a multivariate signal into additive subcomponents that are statistically independent of each other. Useful for 'blind source separation' (e.g., audio).",
        "new": false
      },
      {
        "name": "Apriori Algorithm",
        "concept": "An algorithm for mining frequent itemsets and association rules from transactional databases (market basket analysis). It's computationally heavy on large datasets.",
        "new": false
      },
      {
        "name": "Multilayer Perceptron (MLP)",
        "concept": "The foundational deep neural network. Consists of an input layer, one or more hidden layers, and an output layer, all fully connected and using non-linear activation functions.",
        "new": false
      },
      {
        "name": "Backpropagation",
        "concept": "The core algorithm for training neural networks. It efficiently calculates the gradient of the loss function with respect to the weights using the chain rule.",
        "new": false
      },
      {
        "name": "Gradient Descent",
        "concept": "The iterative optimisation algorithm that adjusts parameters by moving in the direction opposite to the calculated gradient. Simple, but can get stuck in local minima.",
        "new": false
      },
      {
        "name": "Stochastic Gradient Descent (SGD)",
        "concept": "A variation of Gradient Descent that updates parameters using the gradient calculated from only a single, randomly chosen training example per iteration. Introduces useful noise.",
        "new": false
      },
      {
        "name": "Mini-Batch Gradient Descent",
        "concept": "The practical compromise between batch and stochastic methods. Updates parameters using the gradient calculated from a small, fixed-size subset (mini-batch) of the data.",
        "new": false
      },
      {
        "name": "Adam Optimizer",
        "concept": "Adaptive Moment Estimation. A popular optimization algorithm that combines the best parts of AdaGrad and RMSProp for faster convergence and better performance.",
        "new": true
      },
      {
        "name": "Convolutional Neural Network (CNN)",
        "concept": "Uses convolution and pooling layers to automatically and hierarchically extract spatial features from grid-like data (images). Weights are shared, reducing parameters.",
        "new": false
      },
      {
        "name": "Recurrent Neural Network (RNN)",
        "concept": "Designed for sequential data. Information from previous steps is recycled back into the network, creating a loop. Suffers notoriously from the vanishing gradient problem.",
        "new": false
      },
      {
        "name": "Long Short-Term Memory (LSTM)",
        "concept": "An evolution of RNNs that solves the vanishing gradient problem using three specialised gates (input, forget, output) to regulate the flow of information into a 'cell state.'",
        "new": false
      },
      {
        "name": "Transformer Architecture",
        "concept": "The attention-based model that completely replaces recurrence and convolution. Consists of stacked encoder and decoder blocks, solely relying on the self-attention mechanism.",
        "new": false
      },
      {
        "name": "Self-Attention Mechanism",
        "concept": "The key component of the Transformer. It computes a representation of a sequence by relating different positions of the sequence to each other, assigning context-dependent weights.",
        "new": true
      },
      {
        "name": "Generative Adversarial Network (GAN)",
        "concept": "Two networks—Generator and Discriminator—compete in a zero-sum game, pushing each other to generate increasingly realistic fake data that is indistinguishable from real data.",
        "new": false
      },
      {
        "name": "Variational Autoencoder (VAE)",
        "concept": "A generative model that learns a compressed, probabilistic representation (a latent space) of the input data, enabling the generation of smooth, continuous new samples.",
        "new": false
      },
      {
        "name": "Diffusion Models",
        "concept": "State-of-the-art generative models that learn to reverse a process of gradually adding Gaussian noise to an image. They 'denoise' the image back to a clean original state.",
        "new": true
      },
      {
        "name": "Reinforcement Learning (RL)",
        "concept": "An agent learns an optimal policy through interaction with an environment, selecting actions to maximise the long-term cumulative reward. It's about sequential decision-making.",
        "new": false
      },
      {
        "name": "Q-Learning",
        "concept": "A model-free, value-based RL algorithm. It learns the action-value function Q(s,a), which estimates the maximum expected future reward for taking action 'a' in state 's'.",
        "new": false
      },
      {
        "name": "SARSA (State-Action-Reward-State-Action)",
        "concept": "Similar to Q-Learning, but it is an 'on-policy' method. It updates its Q-value based on the next action *actually taken* by the current policy, making it more cautious.",
        "new": false
      },
      {
        "name": "Deep Q-Network (DQN)",
        "concept": "Combines Q-Learning with a deep neural network to estimate the Q-values, enabling successful RL application in high-dimensional state spaces, such as video games.",
        "new": false
      },
      {
        "name": "REINFORCE",
        "concept": "A foundational policy-gradient RL algorithm. It updates the policy parameters by sampling trajectories and calculating the gradient of the performance objective. High variance.",
        "new": true
      },
      {
        "name": "Proximal Policy Optimisation (PPO)",
        "concept": "A policy-gradient method that improves stability by restricting the amount the policy can change at each step, making it one of the most reliable and widely used RL algorithms.",
        "new": false
      },
      {
        "name": "Actor-Critic",
        "concept": "A hybrid RL approach where the 'Actor' proposes actions (policy) and the 'Critic' evaluates those actions (value function). The Critic informs the Actor how to improve.",
        "new": false
      },
      {
        "name": "Transfer Learning",
        "concept": "The practice of reusing a pre-trained model (trained on a massive dataset) as a starting point for a new, related task. Saves huge amounts of time and computational resources.",
        "new": false
      },
      {
        "name": "XGBoost",
        "concept": "An efficient, highly scalable implementation of Gradient Boosting. Often wins Kaggle competitions due to its speed, accuracy, and advanced handling of missing data and regularisation.",
        "new": false
      }
    ];}

// #############################################
// ############## CORE LOGIC ###################
// #############################################

// Utility Function for Error Reporting (Clean Code)
function createErrorWidget(title, message) {
    let widget = new ListWidget();
    widget.setPadding(WIDGET_CONFIG.PADDING, WIDGET_CONFIG.PADDING, WIDGET_CONFIG.PADDING, WIDGET_CONFIG.PADDING);
    widget.backgroundColor = WIDGET_CONFIG.ERROR_BG_COLOR;

    let titleText = widget.addText(title);
    titleText.font = getFont(WIDGET_CONFIG.TITLE_FONT_TYPE, WIDGET_CONFIG.ERROR_TITLE_SIZE);
    titleText.textColor = WIDGET_CONFIG.ERROR_TEXT_COLOR;

    widget.addSpacer(5);

    let messageText = widget.addText(message);
    messageText.font = getFont(WIDGET_CONFIG.CONCEPT_FONT_TYPE, WIDGET_CONFIG.ERROR_BODY_SIZE);
    messageText.textColor = WIDGET_CONFIG.ERROR_TEXT_COLOR;

    return widget;
}

// #############################################
// ############## WODGET LAYOUT ################
// #############################################

async function createWidget() {
    // 1. Load the data (now local)
    let algorithms = loadAlgorithms();

    if (!algorithms || algorithms.length === 0) {
        console.log("Error: Algorithms list is empty. Displaying fallback.");
        return createErrorWidget("Data Ingestion Failure", "The hardcoded list is empty. Check the loadAlgorithms function.");
    }

    // 2. Determine the daily index.
    const today = new Date();
    const startOfYear = new Date(today.getFullYear(), 0, 1);
    const dayIndex = Math.floor((today - startOfYear) / (1000 * 60 * 60 * 24)) % algorithms.length;

    const dailyAlgorithm = algorithms[dayIndex];

    // 3. Render the Medium Widget.
    let widget = new ListWidget();
    widget.setPadding(WIDGET_CONFIG.PADDING, WIDGET_CONFIG.PADDING, WIDGET_CONFIG.PADDING, WIDGET_CONFIG.PADDING);
    widget.backgroundGradient = BGGRADIENT

    // --- Title & Metadata Stack (Top Row) ---
    let headerStack = widget.addStack();
    headerStack.layoutHorizontally();

    // Algorithm Name
    let title = headerStack.addText(dailyAlgorithm.name);
    title.font = getFont(WIDGET_CONFIG.TITLE_FONT_TYPE, WIDGET_CONFIG.TITLE_FONT_SIZE);
    title.textColor = WIDGET_CONFIG.TITLE_COLOR;

    // Highlight 'NEW' if flagged
    if (dailyAlgorithm.new) {
        headerStack.addSpacer(5); // Small gap
        let newTag = headerStack.addText("✨ NEW");
        newTag.font = getFont(WIDGET_CONFIG.NEW_TAG_FONT_TYPE, WIDGET_CONFIG.NEW_TAG_FONT_SIZE);
        newTag.textColor = WIDGET_CONFIG.NEW_TAG_COLOR;
        newTag.textOpacity = WIDGET_CONFIG.NEW_TAG_OPACITY;
    }
    headerStack.addSpacer(); // Pushes elements to the left

    // --- Concept Body (The Substance) ---
    widget.addSpacer(10);

    let bodyText = dailyAlgorithm.concept;
    let concept = widget.addText(bodyText);
    concept.font = getFont(WIDGET_CONFIG.CONCEPT_FONT_TYPE, WIDGET_CONFIG.CONCEPT_FONT_SIZE);
    concept.textColor = WIDGET_CONFIG.CONCEPT_COLOR;
    concept.textOpacity = WIDGET_CONFIG.CONCEPT_OPACITY;

    // Ensure the text fits the medium widget by limiting lines
    concept.lineLimit = WIDGET_CONFIG.CONCEPT_LINE_LIMIT;

    // --- Footer ---
    widget.addSpacer(); // Pushes content up for clean look
    let footer = widget.addText(`ALGORITHM ${dayIndex + 1} OF ${algorithms.length}`);
    footer.font = getFont(WIDGET_CONFIG.FOOTER_FONT_TYPE, WIDGET_CONFIG.FOOTER_FONT_SIZE);
    footer.textColor = WIDGET_CONFIG.FOOTER_COLOR;
    footer.textOpacity = WIDGET_CONFIG.FOOTER_OPACITY;

    return widget;
}

// #############################################
// ############## WIDGET EXECUTION #############
// #############################################

let widget = await createWidget();

if (config.runsInWidget) {
    Script.setWidget(widget);
} else {
    // Preview the medium widget when running directly in Scriptable app
    widget.presentMedium();
}

Script.complete();

// #############################################
// ############## END OF SCRIPT ################
// #############################################