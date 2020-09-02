# Embedding Mood Induction into Qualtrics

The mood induction procedures by Mayer 1995 and Marzillier & Davey 2005, which use both music and prompts, were implemented using jsPsych: [happy](https://kywch.github.io/Mood-Induction_jsPsych/mood-induction-demo.html?mood=happy), [angry](https://kywch.github.io/Mood-Induction_jsPsych/mood-induction-demo.html?mood=angry), [fear](https://kywch.github.io/Mood-Induction_jsPsych/mood-induction-demo.html?mood=fear), [sad](https://kywch.github.io/Mood-Induction_jsPsych/mood-induction-demo.html?mood=sad), and [neutral](https://kywch.github.io/Mood-Induction_jsPsych/mood-induction-demo.html?mood=neutral).

Before running an auditory task (like mood induction or dual n-back), you should make sure participants can listen to sound. To do so, I also made a quick audio test using jsPsych. You can first try the test by clicking [HERE](https://kywch.github.io/Mood-Induction_jsPsych/audio-test-demo.html). See the [Embedding Quick Audio Test](audio-test.md) tutorial to use this in Qualtrics.

I put these codes into the [Mood Induction repository](https://github.com/kywch/Mood-Induction_jsPsych). You can either directly use these files or fork this repository to customize.

This tutorial consists of two parts. (1) I will first explain how you can [embed the mood induction in Qualtrics](mood-induction.md#embedding-the-mood-induction-into-qualtrics). (2) I will then [explain the experiment code](mood-induction.md#explaining-the-code). 

---

## Embedding the Mood Induction into Qualtrics

### Hosting the Mood Induction scripts in GitHub

To use jsPsych in Qualtrics, the jsPsych javascript and CSS files need to be online and loadable from Qualtrics. Creating a GitHub repository for your experiment helps you do so in simple steps.

1. Go to the [Mood Induction repository](https://github.com/kywch/Mood-Induction_jsPsych).
2. Follow the [Hosting jsPsych](github-pages.md) tutorial to fork it to your GitHub repository and make the scripts available online.
3. Also make sure that sound files play on your browser.

When you are done, you can check the online files with your browser by directly going to the **jspsych.js**, **jspsych.css**, **jspsych-fullscreen.js**, and **jspsych-mood-induction.js**.

- **jspsych.js** should be available at `https://<your-github-username>.github.io/Mood-Induction_jsPsych/jspsych-6.1.0/jspsych.js`, like <a href='https://kywch.github.io/Mood-Induction_jsPsych/jspsych-6.1.0/jspsych.js'>https://kywch.github.io/Mood-Induction_jsPsych/jspsych-6.1.0/jspsych.js</a>.
- **jspsych.css** should be available at `https://<your-github-username>.github.io/Mood-Induction_jsPsych/jspsych-6.1.0/css/jspsych.css`, like <a href='https://kywch.github.io/Mood-Induction_jsPsych/jspsych-6.1.0/css/jspsych.css'>https://kywch.github.io/Mood-Induction_jsPsych/jspsych-6.1.0/css/jspsych.css</a>.
- **jspsych-fullscreen.js** should be available at `https://<your-github-username>.github.io/Mood-Induction_jsPsych/jspsych-6.1.0/plugins/jspsych-fullscreen.js`, like <a href='https://kywch.github.io/Mood-Induction_jsPsych/jspsych-6.1.0/plugins/jspsych-fullscreen.js'>https://kywch.github.io/Mood-Induction_jsPsych/jspsych-6.1.0/plugins/jspsych-fullscreen.js</a>.
- **jspsych-mood-induction.js** should be available at `https://<your-github-username>.github.io/Mood-Induction_jsPsych/jspsych-mood-induction.js`, like <a href='https://kywch.github.io/Mood-Induction_jsPsych/jspsych-mood-induction.js'>https://kywch.github.io/Mood-Induction_jsPsych/jspsych-mood-induction.js</a>.

Sound files are stored in the [music folder](https://github.com/kywch/Mood-Induction_jsPsych/tree/master/music) and should be available online.

---

### Embedding the task to Qualtrics

Let's log in to Qualtrics and take a look at each step.

#### Step 1. Create a new Qualtrics project and then a new question

This tutorial assumes that readers are much more familiar with Qualtrics. For Qualtrics tutorial, there are other excellent tutorials available like [this Qualtrics User Guide](https://www.unthsc.edu/center-for-innovative-learning/qualtrics-user-guide/).

To continue, please create a new Qualtrics project. Then, create a new question and (1) change its format to **Text/Graphic**.

![Add JavaScript to a Qualtrics question](img/hello-world-qualtrics-Step1_add_javascript_to_question.jpg)

---

#### Step 2. Open the Question JavaScript editor and copy paste the whole `mood-induction-qualtrics.js`

Keep going in the above picture. (2) Click the gear to open the dropdown menu, and then (3) find and click **Add JavaScript**. 

![Open the Question JavaScript editor](img/hello-world-qualtrics-Step2_open_javascript_editor.jpg)

Then copy-paste the whole [`mood-induction-qualtrics.js` (click to see the code)](https://raw.githubusercontent.com/kywch/Mood-Induction_jsPsych/master/mood-induction-qualtrics.js) into the editor. 

<font color=red>ALSO CHECK WHETHER THE URL, `task_github`, IS VALID.</font>

---

#### Step 3. Open the Question HTML editor and copy paste the below html code

The Change 3 section of the `mood-induction-demo.html` file contains the link to jsPsych CSS file, the inline styles for `display_stage` Div, and the error message to be displayed when things go wrong.

To open the HTML editor, click the `HTML View` button. 

![Open the Question HTML editor](img/hello-world-qualtrics-Step3_open_question_html_editor.jpg)

Then, copy paste the portion of `mood-induction-demo.html` to the HTML editor, starting from `<!-- COPY PASTE TO QUALTRICS FROM HERE -->` to `<!-- COPY PASTE TO QUALTRICS UP TO HERE -->`. 

```html
<!-- Change 3: Adding extra scripts for Qualtrics -->
<!-- COPY PASTE TO QUALTRICS FROM HERE -->
<link href="https://kywch.github.io/Mood-Induction_jsPsych/jspsych-6.1.0/css/jspsych.css" rel="stylesheet" type="text/css">
</link>
<div>
    <span style="font-size: 24px;">
        <br><br>
        If you are seeing this message for <span style="color: rgb(255, 0, 0);">
            <b>more than 5 minutes</b></span>,<br>
        please screen-capture this screen and send the image to us.
        <br><br>
        <span style="font-size: 28px;">We are very sorry for the inconvenience.</span>
    </span>
</div>

<!-- Change 2: Adding `display_stage` CSS and Div -->
<style>
    #display_stage_background {
        width: 100vw;
        background-color: white;
        z-index: -1;
    }

    #display_stage {
        position: fixed;
        left: 1vw;
        top: 1vh;
        height: 98vh;
        width: 98vw;
        background-color: white;
        box-shadow: 1px 1px 1px #999;
        border-radius: 15px;
        z-index: 0;
        overflow-y: hidden;
        overflow-x: hidden;
    }

    #centerbox {
        width: 80vh;
        height: 20vh;
        position: relative;
        top: 40%;
        font-size: 22pt;
        line-height: normal;
    }
</style>
<!-- COPY PASTE TO QUALTRICS UP TO HERE -->
```

After copy pasting, you should see something like below.

![After copy-paste](img/hello-world-qualtrics-Step3_after_copy_paste.jpg)

---

#### Step 4. Create Embedded Data elements

To store the addition details about this audio test, you need to create the Embedded Data elements named **mood**, **mood_script_order** and **mood_spent_time** in your survey by following [this Qualtrics tutorial](https://www.qualtrics.com/support/survey-platform/survey-module/survey-flow/standard-elements/embedded-data/#CreatingAnEmbeddedDataElement). 

1. Click **Survey Flow** from the Survey tab
2. Click **Add a New Element Here**
3. Choose **Embedded Data** 
4. Click **Create New Field or Choose From Dropdown** and type **mood**
5. Click **Add a New Field** and type **mood_script_order**
6. Click **Add a New Field** and type **mood_spent_time**
7. Click **Move** of the new blocks you created (`Set Embedded Data` and `Then Branch If`) and move these blocks the top of Survey Flow

---

#### Step 5. Publish and test!

Publish the survey by following [this Qualtrics tutorial](https://www.qualtrics.com/support/survey-platform/survey-module/survey-publishing-versions/#PublishingNew). Then, an anonymous Qualtrics link is generated. If you click this link, you should be able to see the same Audio Test running in Qualtrics. For example, try [this Qualtrics link](https://ssd.az1.qualtrics.com/jfe/form/SV_4YjlIFFZpmVxtwV).

---

## Explaining the code

For the basics, please read the [Hello world tutorial](hello-world.md).

### A working demo in a local browser: mood-induction-demo.html

Adding the `display_element` parameter in the `jsPsych.init()` and having additional control over the display element is important for embedding jsPsych into Qualtrics. The changes in [`mood-induction-demo.html` (click to see the code)](https://github.com/kywch/Mood-Induction_jsPsych/blob/master/mood-induction-demo.html) are in the same order as in the [Hello world tutorial](hello-world.md). You should be able to run the audio test simply by opening `mood-induction-demo.html` in a browser.

Let's look at each change.

#### Change 1: Using `display_element` 

By adding the `display_element` parameter in the `jsPsych.init()` like below, jsPsych will render the experiment in the `<div>` called `display_stage`, which the current script does not have yet. So, let's add the `display_stage`.

```js
    /* Change 1: Using `display_element` */
    jsPsych.init({
        timeline: timeline,
        display_element: 'display_stage'
    })
```

#### Change 2: Adding `display_stage` CSS and Div

The `display_stage` needs below CSS and HTML code after the `<body>` tag, which also include the `display_stage_background`. Both are necessary to function well. 

The `centerbox` is where we put the text prompts. 

```html
<!-- Change 2: Adding `display_stage` CSS and Div -->
<style>
    #display_stage_background {
        width: 100vw;
        background-color: white;
        z-index: -1;
    }

    #display_stage {
        position: fixed;
        left: 1vw;
        top: 1vh;
        height: 98vh;
        width: 98vw;
        background-color: white;
        box-shadow: 1px 1px 1px #999;
        border-radius: 15px;
        z-index: 0;
        overflow-y: hidden;
        overflow-x: hidden;
    }

    #centerbox {
        width: 80vh;
        height: 20vh;
        position: relative;
        top: 40%;
        font-size: 22pt;
        line-height: normal;
    }
</style>
<!-- COPY PASTE TO QUALTRICS UP TO HERE -->

<div id='display_stage_background'></div>
<div id='display_stage'></div>
```

#### Change 3: Adding extra scripts for Qualtrics

The below scripts are not necessary to run this task, but you need to copy-paste these in Qualtrics later. 

One critical point is that now we use the jsPsych stylesheet hosted in the GitHub Pages (explained above in the [Hosting jsPsych](rt-task.md#step-4-enable-github-pages-for-your-experiment) section) instead of the CSS file in your computer. This is important because Qualtrics can also access the GitHub-hosted files.

```html
<!-- Change 3: Adding extra scripts for Qualtrics -->
<!-- COPY PASTE TO QUALTRICS FROM HERE -->
<link href="https://kywch.github.io/Mood-Induction_jsPsych/jspsych-6.1.0/css/jspsych.css" rel="stylesheet" type="text/css">
</link>
<div>
    <span style="font-size: 24px;">
        <br><br>
        If you are seeing this message for <span style="color: rgb(255, 0, 0);">
            <b>more than 5 minutes</b></span>,<br>
        please screen-capture this screen and send the image to us.
        <br><br>
        <span style="font-size: 28px;">We are very sorry for the inconvenience.</span>
    </span>
</div>
```

### Qualtrics transformation: mood-induction-qualtrics.js

To make your jsPsych experiment work in Qualtrics, you need to add your code to the below skeleton provided by Qualtrics Question JavaScript Editor. For details, see the [Add JavaScript help page](https://www.qualtrics.com/support/survey-platform/survey-module/question-options/add-javascript/).

```js
Qualtrics.SurveyEngine.addOnload(function()
{
	/*Place your JavaScript here to run when the page loads*/

});

Qualtrics.SurveyEngine.addOnReady(function()
{
	/*Place your JavaScript here to run when the page is fully displayed*/

});

Qualtrics.SurveyEngine.addOnUnload(function()
{
	/*Place your JavaScript here to run when the page is unloaded*/

});
```

Let's look at each change.

#### Change 1: Hiding the Next button

The below javascript code hides the Next button and puts the javascript code in the driving seat.

```js
/* Change 1: Hiding the Next button */
// Retrieve Qualtrics object and save in qthis
var qthis = this;

// Hide buttons
qthis.hideNextButton();
```

#### Change 2: Defining and load required resources

The below javascript defines where the necessary files are so that Qualtrics can load these. If you enabled GitHub Pages of your repository, Qualtrics can load the necessary JS, CSS, and image files right away.

<font color=red>AFTER TESTING, CHANGE the `flag_debug` variable to `false`.</font>

```js
/* Change 2: Defining and load required resources */
// task-related variables
var flag_debug = true;
var time_unit = 1000; // ms
var mood_spent_time = '';
var script_order = '';

// requiredResources must include all the required JS files
var task_github = "https://kywch.github.io/Mood-Induction_jsPsych/"; // https://<your-github-username>.github.io/<your-experiment-name>
var requiredResources = [
    task_github + "jspsych-6.1.0/jspsych.js",
    task_github + "jspsych-6.1.0/plugins/jspsych-fullscreen.js",
    task_github + "jspsych-mood-induction.js"
];

function loadScript(idx) {
    console.log("Loading ", requiredResources[idx]);
    jQuery.getScript(requiredResources[idx], function () {
        if ((idx + 1) < requiredResources.length) {
            loadScript(idx + 1);
        } else {
            initExp();
        }
    });
}

if (window.Qualtrics && (!window.frameElement || window.frameElement.id !== "mobile-preview-view")) {
    loadScript(0);
}
```

#### Change 3: Appending the display_stage Div using jQuery

In Qualtrics, jQuery (loaded by default) is used to append the `display_stage_background` and `display_stage` Divs. The CSS for these elements will be added directly to Question HTML later in this tutorial.

```js
/* Change 3: Appending the display_stage Div using jQuery */
// jQuery is loaded in Qualtrics by default
jQuery("<div id = 'display_stage_background'></div>").appendTo('body');
jQuery("<div id = 'display_stage'></div>").appendTo('body');
```

#### Change 4: Adding resources, scripts, and helper functions

Note that the music-only duration is set to 60 s (or 6 s when `flag_debug` is `true`) and the prompt duration is set to 30 s (or 3 s when `flag_debug` is `true`). See inside the function `generate_mood_induction` to modify these.

```js
/* Change 4: Adding resouces, scripts, and helper functions */
var mood_music = {
    happy: task_github + 'music/Mazurka_HappyMIP.mp3', // happy
    angry: task_github + 'music/NightOnBaldMountain_AngerMIP.mp3', // angry
    fear: task_github + 'music/PsychoTheme_FearMIP.mp3', // fear
    sad: task_github + 'music/ChopinOpus28no6_SadMIP.mp3', // sad
    neutral: task_github + 'music/ChopinWaltz11_NeutralMIP.mp3' // neutral
};
var mood_scripts = {};

mood_scripts['happy'] = [ // happy
    "You just got a new job, and it's even better than you expected.",
    "You wake up on a Saturday after a number of wintry-cold rainy days, and the temperature is in the high sixties.",
    "You buy a lottery ticket and you win $100.00 instantly.",
    "You and a friend go to a nice restaurant. The meal, the conversation and the atmosphere are all perfect.",
    "You get out of class or work early. It’s a beautiful day and you and some friends go out for ice cream.",
    "You spend a day in the mountains; the air is clean and sharp, the day sunny, and you take a swim in a beautiful lake.",
    "You unexpectedly run into someone you like. You go for coffee and have a great conversation. You discover you think alike, and share many of the same interests.",
    "It’s your birthday and friends throw you a terrific surprise party."
];

mood_scripts['angry'] = [ // angry
    "A student stole the exam in an important course you’re taking. The teacher takes it out on everyone by making such a tough exam that you get a very low grade even though you understood the material.",
    "A friend of yours was assaulted by a convicted rapist just released on parole.",
    "Your boss decides to promote another employee who is related to him to a position he knew you wanted. He tells you that you didn’t work hard enough, even though he knows you worked much harder and better than his relative.",
    "It’s a very hot day, and you have been standing in a long, slow line at the Department of Motor Vehicles for over an hour. Kids are screaming all around you when two of the four clerks close their windows for no apparent reason.",
    "Someone put a big scratch in your car while it was parked in the lot and didn’t even bother to leave a note.",
    "The landlord doesn’t like you and has been accusing you of unsanitary conditions, even though you keep your apartment very clean. You arrive home only to see an eviction notice on your door.",
    "Somebody files false legal claim against you.",
    "You have had a long, busy day and the person you live with starts to complain about how you forgot to do something that you forgot to do."
]

mood_scripts['fear'] = [ // fear
    "You are riding alone in an elevator when a man walks in and pulls out a knife. He stares at you without saying what he wants.",
    "You’re in an overcrowded carriage at the top of a ferris wheel when the mechanism malfunctions and the wheel jams. A thunder storm is developing, and the wheel sways in the wind, it’s metal creaking.",
    "Your car breaks down on a back street in a dangerous part of the city. You start to go for help when you see several teenage boys walking toward you carrying weapons.",
    "You are driving down an unfamiliar road on a stormy night when your car skids out of control.",
    "You are driving down the road when a tractor trailer in the opposite direction crosses over into your lane.",
    "You’re in your your bedroom late at night when you hear someone enter your apartment. No one else you know has a key.",
    "You’re swimming in a dark lake and something big, slimy, and prickly brushes against your leg.",
    "You’re having a nightmare about someone chasing you and you fall into a bottomless pit. You start to scream in your sleep."
];

mood_scripts['sad'] = [ // sad
    "You read in the newspaper that a teacher you used to house-sit for recently passed away.",
    "You are told by a young relative that she has cancer and only six months to live.",
    "You have been dating someone and thought it looked quite promising, when the person calls you up and tells you he/she doesn’t want to see you anymore.",
    "A pet you were really fond of has died.",
    "Your best friend just got married and is moving far away from you.",
    "No one remembers your birthday.",
    "A relative of yours, with whom you’ve shared a close relationship, has been diagnosed as having cancer and has only a short time to live.",
    "A beloved pet dies of old age. You have very fond memories of your pet and are reminded of them every time you see a similar breed."
];

mood_scripts['neutral'] = [ // neutral
    "You get up in the morning, get dressed and have your usual breakfast.",
    "You go to the supermarket and get a week’s worth of groceries. You unload the bags from the car and put the food away.",
    "It is the evening and you are feeling tired. You have a long bath, wash your hair, and watch some television.",
    "You decide to clean your kitchen, and spend some time wiping down the counter tops and sweeping the floor.",
    "As you are driving you notice you are low on gas. You fill up your car from a nearby gas station and buy a drink while you are there.",
    "You go to a restaurant and order a starter and a main course. You have a glass of water with your meal.",
    "Whilst going for a walk you meet someone you know. You chat about the weather and your plans for the weekend.",
    "You and some friends go to your local cinema and watch a film. After it is finished you go home."
];

function generate_mood_induction(mood = 'happy') {

    if (mood_music[mood] === undefined) {
        throw 'Undefined mood was entered.';
    }

    var pages = [];
    pages.push({
        prompt: '<div id=centerbox>Please listen to the music for a minute.</div>',
        duration: 60 * time_unit
    });
    let order = jsPsych.randomization.shuffle([...Array(mood_scripts[mood].length).keys()])
    for (let ii of order) {
        pages.push({
            prompt: "<div id=centerbox>" + mood_scripts[mood][ii] + "</div>",
            duration: 30 * time_unit
        });
    }
    return {
        type: 'mood-induction',
        background_music: mood_music[mood],
        pages: pages,
        on_finish: function (data) {
            script_order = order.toString().replace(/,/g, ';');
            mood_spent_time = data.view_history.toString().replace(/,/g, ';');
            //console.log(pages);
            //console.log(script_order, mood_spent_time);
        }
    }
}
```

#### Change 5: Wrapping jsPsych.init() in a function

The main experiment codes are wrapped in the `initExp` function to make sure it runs after all the necessary library and plugin files are loaded (as defined in the `loadScript` function above).

You can pass `mood` via URL parameter, like `?mood=happy`, and this script can read it by piping from an Embedded Data `mood`. 

```js
/* Change 5: Wrapping jsPsych.init() in a function */
function initExp() {

    var mood = "${e://Field/mood}";

    // experimental session-defining variables
    if (flag_debug) {
        
        // WARNING: WHEN DEPLOYING THIS, BE SURE TO CHANGE flag_debug to false
        
        // if true: make the button appear faster
        time_unit = 100; // ms instead of 1000 ms
        console.log('Entered mood: ', mood);
    }

    // push all the procedures, which are defined in stop-it_main.js to the overall timeline
    var timeline = []; // this array stores the events we want to run in the experiment

    // use the full screen
    // also playing sound only works after an interaction with user, like button press
    timeline.push({
        type: 'fullscreen',
        message: '<p>Music will start to play when you press the button below.</p><br>',
        fullscreen_mode: true
    });

    timeline.push(generate_mood_induction(mood));

    timeline.push({
        type: 'fullscreen',
        fullscreen_mode: false
    });

    jsPsych.init({
        display_element: 'display_stage',
        timeline: timeline,

        // see the Change 6

    });
}

```

#### Change 6: Adding the clean up and continue functions

When the jsPsych ends, `display_stage` and `display_stage_background` should be removed. 

This script also saves additional data (script order and spent time)) to Qualtrics Embedded Data.

After saving, the script executes the `clickNextButton` to simulate clicking the Next button and proceed to the next question.

```js
    on_finish: function () {

        /* Change 6: Adding the clean up and continue functions.*/
        
        // save the induction-related data to Qualtrics
        Qualtrics.SurveyEngine.setEmbeddedData("mood_script_order", script_order);
        Qualtrics.SurveyEngine.setEmbeddedData("mood_spent_time", mood_spent_time);
        if (flag_debug) {
            console.log('Mood script order: ', script_order);
            console.log('Mood spent time: ', mood_spent_time);
        }
    
        // clear the stage
        jQuery('display_stage').remove();
        jQuery('display_stage_background').remove();

        // simulate click on Qualtrics "next" button, making use of the Qualtrics JS API
        qthis.clickNextButton();
    }
```
