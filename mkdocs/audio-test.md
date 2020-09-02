# Embedding a Quick Audio Test into Qualtrics

Before running an auditory task (like mood induction or dual n-back), you should make sure participants can listen to sound. To do so, I made a quick audio test using jsPsych. You can first try the test by clicking [HERE](https://kywch.github.io/Mood-Induction_jsPsych/audio-test-demo.html).

I put the working codes into the [Mood Induction repository](https://github.com/kywch/Mood-Induction_jsPsych). You can either directly use these files or fork this repository to customize.

This tutorial consists of two parts. (1) I will first explain how you can [embed the Audio Test in Qualtrics](audio-test.md#embedding-the-quick-audio-test-into-qualtrics). (2) I will then [explain the experiment code](audio-test.md#explaining-the-code). 

---

## Embedding the Quick Audio Test into Qualtrics

### Hosting the Quick Audio Test scripts in GitHub

To use jsPsych in Qualtrics, the jsPsych javascript and CSS files need to be online and loadable from Qualtrics. Creating a GitHub repository for your experiment helps you do so in simple steps.

1. Go to the [Mood Induction repository](https://github.com/kywch/Mood-Induction_jsPsych).
2. Follow the [Hosting jsPsych](github-pages.md) tutorial to fork it to your GitHub repository and make the scripts available online.
3. Also make sure that sound files play on your browser.

When you are done, you can check the online files with your browser by directly going to the **jspsych.js**, **jspsych.css**, **jspsych-fullscreen.js**, and **jspsych-audio-keyboard-with-replay.js**.

- **jspsych.js** should be available at `https://<your-github-username>.github.io/Mood-Induction_jsPsych/jspsych-6.1.0/jspsych.js`, like <a href='https://kywch.github.io/Mood-Induction_jsPsych/jspsych-6.1.0/jspsych.js'>https://kywch.github.io/Mood-Induction_jsPsych/jspsych-6.1.0/jspsych.js</a>.
- **jspsych.css** should be available at `https://<your-github-username>.github.io/Mood-Induction_jsPsych/jspsych-6.1.0/css/jspsych.css`, like <a href='https://kywch.github.io/Mood-Induction_jsPsych/jspsych-6.1.0/css/jspsych.css'>https://kywch.github.io/Mood-Induction_jsPsych/jspsych-6.1.0/css/jspsych.css</a>.
- **jspsych-fullscreen.js** should be available at `https://<your-github-username>.github.io/Mood-Induction_jsPsych/jspsych-6.1.0/plugins/jspsych-fullscreen.js`, like <a href='https://kywch.github.io/Mood-Induction_jsPsych/jspsych-6.1.0/plugins/jspsych-fullscreen.js'>https://kywch.github.io/Mood-Induction_jsPsych/jspsych-6.1.0/plugins/jspsych-fullscreen.js</a>.
- **jspsych-audio-keyboard-with-replay.js** should be available at `https://<your-github-username>.github.io/Mood-Induction_jsPsych/jspsych-audio-keyboard-with-replay.js`, like <a href='https://kywch.github.io/Mood-Induction_jsPsych/jspsych-audio-keyboard-with-replay.js'>https://kywch.github.io/Mood-Induction_jsPsych/jspsych-audio-keyboard-with-replay.js</a>.

Sound files are stored in the [audiotest folder](https://github.com/kywch/Mood-Induction_jsPsych/tree/master/audiotest) and should be available online, like <a href='https://kywch.github.io/Mood-Induction_jsPsych/audiotest/c.mp3'>https://kywch.github.io/Mood-Induction_jsPsych/audiotest/c.mp3</a>.


---

### Embedding the task to Qualtrics

Let's log in to Qualtrics and take a look at each step.

#### Step 1. Create a new Qualtrics project and then a new question

This tutorial assumes that readers are much more familiar with Qualtrics. For Qualtrics tutorial, there are other excellent tutorials available like [this Qualtrics User Guide](https://www.unthsc.edu/center-for-innovative-learning/qualtrics-user-guide/).

To continue, please create a new Qualtrics project. Then, create a new question and (1) change its format to **Text/Graphic**.

![Add JavaScript to a Qualtrics question](img/hello-world-qualtrics-Step1_add_javascript_to_question.jpg)

---

#### Step 2. Open the Question JavaScript editor and copy paste the whole `audio-test-qualtrics.js`

Keep going in the above picture. (2) Click the gear to open the dropdown menu, and then (3) find and click **Add JavaScript**. 

![Open the Question JavaScript editor](img/hello-world-qualtrics-Step2_open_javascript_editor.jpg)

Then copy-paste the whole [`audio-test-qualtrics.js` (click to see the code)](https://raw.githubusercontent.com/kywch/Mood-Induction_jsPsych/master/audio-test-qualtrics.js) into the editor. 

<font color=red>ALSO CHECK WHETHER THE URLs ARE VALID. For example, `task_github` and `audio_url`.</font>

---

#### Step 3. Open the Question HTML editor and copy paste the below html code

The Change 3 section of the `audio-test-demo.html` file contains the link to jsPsych CSS file, the inline styles for `display_stage` Div, and the error message to be displayed when things go wrong.

To open the HTML editor, click the `HTML View` button. 

![Open the Question HTML editor](img/hello-world-qualtrics-Step3_open_question_html_editor.jpg)

Then, copy paste the portion of `audio-test-demo.html` to the HTML editor, starting from `<!-- COPY PASTE TO QUALTRICS FROM HERE -->` to `<!-- COPY PASTE TO QUALTRICS UP TO HERE -->`. 

```html
<!-- Change 3: Adding extra scripts for Qualtrics -->
<!-- COPY PASTE TO QUALTRICS FROM HERE -->
<link href="https://kywch.github.io/Mood-Induction_jsPsych/jspsych-6.1.0/css/jspsych.css" rel="stylesheet"
    type="text/css">
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
        width: 80vw;
        height: 30vh;
        position: relative;
        top: 40%;
        font-size: 20pt;
        line-height: normal;
    }
</style>
<!-- COPY PASTE TO QUALTRICS UP TO HERE -->
```

After copy pasting, you should see something like below.

![After copy-paste](img/hello-world-qualtrics-Step3_after_copy_paste.jpg)

---

#### Step 4. Create Embedded Data elements

To store the addition details about this audio test, you need to create the Embedded Data elements named **audio_test_rt** and **audio_test_order** in your survey by following [this Qualtrics tutorial](https://www.qualtrics.com/support/survey-platform/survey-module/survey-flow/standard-elements/embedded-data/#CreatingAnEmbeddedDataElement). 

1. Click **Survey Flow** from the Survey tab
2. Click **Add a New Element Here**
3. Choose **Embedded Data** 
4. Click **Create New Field or Choose From Dropdown** and type **audio_test_rt**
5. Click **Add a New Field** and type **audio_test_order**
6. Click **Move** of the new blocks you created (`Set Embedded Data` and `Then Branch If`) and move these blocks the top of Survey Flow

---

#### Step 5. Publish and test!

Publish the survey by following [this Qualtrics tutorial](https://www.qualtrics.com/support/survey-platform/survey-module/survey-publishing-versions/#PublishingNew). Then, an anonymous Qualtrics link is generated. If you click this link, you should be able to see the same Audio Test running in Qualtrics. For example, try [this Qualtrics link](https://ssd.az1.qualtrics.com/jfe/form/SV_4YjlIFFZpmVxtwV).

---

## Explaining the code

For the basics, please read the [Hello world tutorial](hello-world.md).

### A working demo in a local browser: audio-test-demo.html

Adding the `display_element` parameter in the `jsPsych.init()` and having additional control over the display element is important for embedding jsPsych into Qualtrics. The changes in [`audio-test-demo.html` (click to see the code)](https://github.com/kywch/Mood-Induction_jsPsych/blob/master/audio-test-demo.html) are in the same order as in the [Hello world tutorial](hello-world.md). You should be able to run the audio test simply by opening `audio-test-demo.html` in a browser.

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
        width: 80vw;
        height: 30vh;
        position: relative;
        top: 40%;
        font-size: 20pt;
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
<link href="https://kywch.github.io/Mood-Induction_jsPsych/jspsych-6.1.0/css/jspsych.css" rel="stylesheet"
    type="text/css">
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

### Qualtrics transformation: audio-test-qualtrics.js

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

```js
/* Change 2: Defining and load required resources */
// task-related variables
var audio_test_rt = [];
var audio_test_order = [];

// requiredResources must include all the required JS files
var task_github = "https://kywch.github.io/Mood-Induction_jsPsych/"; // https://<your-github-username>.github.io/<your-experiment-name>
var requiredResources = [
    task_github + "jspsych-6.1.0/jspsych.js",
    task_github + "jspsych-6.1.0/plugins/jspsych-fullscreen.js",
    task_github + "jspsych-audio-keyboard-with-replay.js"
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

```js
/* Change 4: Adding resouces, scripts, and helper functions */
var audio_url = 'https://kywch.github.io/Mood-Induction_jsPsych/audiotest/';
var audio_seed = ['c', 'd', 'g', 'k', 'p', 'q', 't'];

// WARNING: YOU SHOULD MAKE SURE THE OUTPUT URLS ARE CORRECT
function get_audio_url(audio_url, file_name, file_ext = 'mp3') {
    return audio_url + file_name + '.' + file_ext;
}

// generate audiotest trials
function generate_audiotest_block(audio_url, audio_seed) {

    audio_test_order = jsPsych.randomization.shuffle(audio_seed);
    let block_audiotest = [];
    let enter_audiotest_page = {
        type: 'audio-keyboard-with-replay',
        prompt: "<div id=centerbox><p>" +
            "The task you are about to do requires listening to sounds. Please adjust your sound setting.<br> " +
            "<p>We will do a simple task to make sure you can hear the sounds. </p>" +
            "<p>In the next pages, press the alphabet key associated with the played sound to proceed. </p> " +
            "<br><p>If you are ready, press the <strong>'n'</strong> key to proceed.</p>" +
            "<p>If the key doesn't work, please click the screen and press again.</p></div>",
        choices: ['n'],
    };
    block_audiotest.push(enter_audiotest_page);

    for (let ii = 0; ii < audio_test_order.length; ii++) {
        let audiotest_trial = {
            type: 'audio-keyboard-with-replay',
            stimulus: get_audio_url(audio_url, audio_test_order[ii]),
            prompt: "<div id=centerbox><p>" +
                "Trial " + (ii + 1) + " / " + audio_test_order.length + " : " +
                "Please press the alphabet key you just heard.</p>" +
                "<br><p>To replay, press the <strong>'r'</strong> key. </p></div>",
            choices: [audio_test_order[ii]],
            on_finish: function (data) {
                audio_test_rt.push(data.rt)
            }
        }
        block_audiotest.push(audiotest_trial);
    }
    return {
        timeline: block_audiotest
    };
}
```

#### Change 5: Wrapping jsPsych.init() in a function

The main experiment codes are wrapped in the `initExp` function to make sure it runs after all the necessary library and plugin files are loaded (as defined in the `loadScript` function above).

```js
/* Change 5: Wrapping jsPsych.init() in a function */
function initExp() {

    // push all the procedures, which are defined in stop-it_main.js to the overall timeline
    var timeline = []; // this array stores the events we want to run in the experiment

    // use the full screen
    // also playing sound only works after an interaction with user, like button press
    timeline.push({
        type: 'fullscreen',
        message: '<p>Audio test will start to play when you press the button below.</p><br>',
        fullscreen_mode: true
    });

    timeline.push(generate_audiotest_block(audio_url, audio_seed));

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

This script also saves additional data (test order and RT) to Qualtrics Embedded Data.

After saving, the script executes the `clickNextButton` to simulate clicking the Next button and proceed to the next question.

```js
    on_finish: function () {

        /* Change 6: Adding the clean up and continue functions.*/

        // save the induction-related data to Qualtrics
        Qualtrics.SurveyEngine.setEmbeddedData("audio_test_rt", audio_test_rt.toString().replace(/,/g, ';'));
        Qualtrics.SurveyEngine.setEmbeddedData("audio_test_order", audio_test_order.toString().replace(/,/g, ';'));
    
        // clear the stage
        jQuery('display_stage').remove();
        jQuery('display_stage_background').remove();

        // simulate click on Qualtrics "next" button, making use of the Qualtrics JS API
        qthis.clickNextButton();
    }
```
