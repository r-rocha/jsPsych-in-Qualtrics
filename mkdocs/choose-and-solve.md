# Embedding Choose-And-Solve Task (CAST) into Qualtrics

The Choose-And-Solve Task [(Choe et al., 2019)](https://advances.sciencemag.org/content/5/11/eaay1062) is an effort-based decision-making task to study math anxiety and math avoidance behavior. You can first try the task by clicking [HERE](https://kywch.github.io/CAST_jsPsych/choose-and-solve-task.html).

The CAST code is freely available at the [CAST GitHub repository](https://github.com/kywch/CAST_jsPsych). You can either directly use these files for your study or fork this repository to customize.

This tutorial consists of two parts. (1) I will first explain how you can [embed CAST in Qualtrics](choose-and-solve.md#embedding-cast-into-qualtrics). (2) I will then [briefly explain the experiment code](choose-and-solve.md#explaining-the-code).

---

## Embedding CAST into Qualtrics

### Hosting the CAST scripts in GitHub

To use jsPsych in Qualtrics, the jsPsych javascript and CSS files need to be online and loadable from Qualtrics. Necessary files are already available online and used in the [live demo](https://kywch.github.io/CAST_jsPsych/choose-and-solve-task.html).

**(OPTIONAL)** However, if you want to create your own version, you can do so by

1. Go to the [CAST GitHub repository](https://github.com/kywch/CAST_jsPsych).
2. Follow the [Hosting jsPsych](github-pages.md) tutorial to fork it to your GitHub repository and make the scripts available online.

---

### Embedding the task to Qualtrics

Let's log in to Qualtrics and take a look at each step.

#### Step 1. Create a new Qualtrics project and then a new question

This tutorial assumes that readers are much more familiar with Qualtrics. For Qualtrics tutorial, there are other excellent tutorials available like [this Qualtrics User Guide](https://www.unthsc.edu/center-for-innovative-learning/qualtrics-user-guide/).

To continue, please create a new Qualtrics project. Then, create a new question and (1) change its format to **Text/Graphic**.

![Add JavaScript to a Qualtrics question](img/hello-world-qualtrics-Step1_add_javascript_to_question.jpg)

---

#### Step 2. Open the Question JavaScript editor and copy paste the whole `choose-and-solve_qualtrics.js`

Keep going in the above picture. (2) Click the gear to open the dropdown menu, and then (3) find and click **Add JavaScript**. 

![Open the Question JavaScript editor](img/hello-world-qualtrics-Step2_open_javascript_editor.jpg)

Then copy-paste the whole [`choose-and-solve_qualtrics.js` (click to see the code)](https://raw.githubusercontent.com/kywch/CAST_jsPsych/master/choose-and-solve_qualtrics.js) into the editor. 

<font color=red>ALSO CHECK WHETHER THE URL, `task_github`, IS VALID.</font>

---

#### Step 3. Open the Question HTML editor and copy paste the below html code

To put the HTML code that contains the link to jsPsych CSS file, the inline styles for `display_stage` Div, and the error message to be displayed when things go wrong, open the HTML editor by clicking the `HTML View` button. 

![Open the Question HTML editor](img/hello-world-qualtrics-Step3_open_question_html_editor.jpg)

Then, copy paste the below HTML code to the HTML editor, starting from `<!-- COPY PASTE TO QUALTRICS FROM HERE -->` to `<!-- COPY PASTE TO QUALTRICS UP TO HERE -->`. 

```html
<!-- COPY PASTE TO QUALTRICS FROM HERE -->
<link href="https://kywch.github.io/CAST_jsPsych/lib_for_qualtrics/cast.css" rel="stylesheet" type="text/css"></link>
<div>
    <span style="font-size: 24px;">
        <br><br>
        If you are seeing this message for <span style="color: rgb(255, 0, 0);">
            <b>more than 5 minutes</b></span>,<br>
        please screen-capture this screen and send the image to us (YOUR EMAIL).
        <br><br>
        <span style="font-size: 28px;">We are very sorry for the inconvenience.</span>
    </span>
</div>

<style>
    .display_stage_background {
        width: 100vw;
        background-color: white;
        z-index: -1;
    }

    .display_stage {
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
</style>
<!-- COPY PASTE TO QUALTRICS UP TO HERE -->
```

After copy pasting, you should see something like below.

![After copy-paste](img/hello-world-qualtrics-Step3_after_copy_paste.jpg)

---

#### Step 4. Create Embedded Data elements

To store the session-level CAST data, you need to create the below <font color=red>**29** Embedded Data elements</font> in your survey.

```
    points, bonus
    easy_math_cnt, easy_acc_math, easy_RT_math 
    easy_word_cnt, easy_acc_word, easy_RT_word
    hard_math_cnt, hard_level_math, hard_acc_math, hard_RT_math 
    hard_word_cnt, hard_level_word, hard_acc_word, hard_RT_word
    hcp_h2e2_math, hcp_h3e2_math, hcp_h4e2_math, hcp_h5e2_math, hcp_h6e2_math, hcp_h456e2_math
    hcp_h2e2_word, hcp_h3e2_word, hcp_h4e2_word, hcp_h5e2_word, hcp_h6e2_word, hcp_h456e2_word
    cnt_per_cond
```

To do so, follow [this Qualtrics tutorial](https://www.qualtrics.com/support/survey-platform/survey-module/survey-flow/standard-elements/embedded-data/#CreatingAnEmbeddedDataElement). 

1. Click **Survey Flow** from the Survey tab
2. Click **Add a New Element Here**
3. Choose **Embedded Data** 
4. Click **Create New Field or Choose From Dropdown** and type **points**
5. Click **Add a New Field** and type **bonus**
6. **Repeteadly add <font color=red>the remaining 27 elements</font>** (until `hcp_h456e2_word` and `cnt_per_cond`).
7. Click **Move** of the new blocks you created (`Set Embedded Data` and `Then Branch If`) and move these blocks the top of Survey Flow

---

#### Step 5. Publish and test!

Publish the survey by following [this Qualtrics tutorial](https://www.qualtrics.com/support/survey-platform/survey-module/survey-publishing-versions/#PublishingNew). Then, an anonymous Qualtrics link is generated. If you click this link, you should be able to see the same CAST running in Qualtrics.

---

## Explaining the code

For the basics, please read the [Hello world tutorial](hello-world.md).

### Qualtrics js code: choose-and-solve_qualtrics.js

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
    /* Change 2: Defining and loading required resources */
    // `requiredResources` must include all the required JS files
    var task_github = "https://kywch.github.io/CAST_jsPsych/lib_for_qualtrics/"; // https://<your-github-username>.github.io/<your-experiment-name>
    var requiredResources = [
        task_github + "jquery.min.js",
        task_github + "jspsych.js",
        task_github + "jspsych-text.js",
        task_github + "jspsych-poldrack-instructions.js",
        task_github + "jspsych-single-stim-rev.js",
        task_github + "poldrack_utils.js",
        task_github + "probset.js",
        task_github + "practice_problems.js",
        task_github + "choose-and-solve_main.js"
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

#### Change 3: Wrapping jsPsych.init() in a function

The main experiment codes are wrapped in the `initExp` function to make sure it runs after all the necessary library and plugin files are loaded (as defined in the `loadScript` function above).

```js
    /* Change 3: Wrapping jsPsych.init() in a function */
    function initExp() {

        // instruction image location
        var task_instruct_page1 = '<div class = centerbox><p class = block-text>Welcome to the choose-and-solve task!</p></div>';
        var task_instruct_page2 =
            '<div class = centerbox><p class = block-text>This task consists of four parts.</p>  ' +
            '<p class = block-text>Your performance-based cash bonus will be determined in the last block of 140 trials.</p>' +
            '<p class = block-text>1. Word practice (12 problems)</p>' +
            '<p class = block-text>2. Math practice (12 problems)</p>' +
            '<p class = block-text>3. Choose-and-solve practice (28 trials)</p>' +
            '<p class = block-text>4. Five blocks of choose-and-solve trials (140 trials)</p></div>'
        var task_instruct_page = {
            type: 'poldrack-instructions',
            data: {
                exp_stage: 'task_instruction',
                participant: sbj_id,
            },
            pages: [task_instruct_page1, task_instruct_page2],
            allow_keys: false,
            show_clickable_nav: true,
            timing_post_trial: 1000
        };

        // NOTE that the functions used below are defined in `choose-and-solve_main.js` for readability
        var maadm_experiment = [];
        maadm_experiment.push(task_instruct_page);
        maadm_experiment.push({
            timeline: sequence_word_practice
        });
        maadm_experiment.push({
            timeline: sequence_math_practice
        });
        maadm_experiment.push({
            timeline: sequence_practice_choice
        });
        maadm_experiment.push(enter_mainexp_page);
        for (var ii = 0; ii < num_block; ii++) {
            maadm_experiment.push({
                timeline: generate_main_block(ii)
            });
        }

        jsPsych.init({
            display_element: "getDisplayElement",
            timeline: maadm_experiment,
            fullscreen: true,

});
```

#### Changes 4-5: Summarizing and saving the session-level data

This script aggregates and saves the session-level data to Qualtrics Embedded Data to simplify the overall analysis.

When the jsPsych ends, `display_stage` and `display_stage_background` divs are removed. 

After saving, the script executes the `clickNextButton` to simulate clicking the Next button and proceed to the next question.

```js
on_finish: function () {

    /* Change 4: Summarize the data */

    var cnt_trial_type = {};
    // for math trials
    cnt_trial_type["me0"] = 0; // # of hard math chosen / solved when 2 vs 2
    cnt_trial_type["me2"] = 0; //                no choice trials, easy reward 2
    cnt_trial_type["mh0"] = 0; // # of hard math chosen / solved when 2 vs 2
    cnt_trial_type["mh1"] = 0; //                when 3 vs 2
    cnt_trial_type["mh2"] = 0; //                when 4 vs 2
    cnt_trial_type["mh3"] = 0; //                when 5 vs 2
    cnt_trial_type["mh4"] = 0; //                when 6 vs 2
    cnt_trial_type["mh5"] = 0; //                no choice trials, hard reward 5
    // for word trials
    cnt_trial_type["we0"] = 0; // # of hard word chosen / solved when 2 vs 2
    cnt_trial_type["we2"] = 0; //                no choice trials, easy reward 2
    cnt_trial_type["wh0"] = 0; // # of hard word chosen / solved when 2 vs 2
    cnt_trial_type["wh1"] = 0; //                when 3 vs 2
    cnt_trial_type["wh2"] = 0; //                when 4 vs 2
    cnt_trial_type["wh3"] = 0; //                when 5 vs 2
    cnt_trial_type["wh4"] = 0; //                when 6 vs 2
    cnt_trial_type["wh5"] = 0; //                no choice trials, hard reward 5
    // count the me, mh, we, wh trials
    cnt_trial_type["me_cnt"] = 0;
    cnt_trial_type["mh_cnt"] = 0;
    cnt_trial_type["we_cnt"] = 0;
    cnt_trial_type["wh_cnt"] = 0;
    // count correct trials
    cnt_trial_type["me_corr"] = 0; // # of correct for easy math
    cnt_trial_type["mh_corr"] = 0; //              for hard math
    cnt_trial_type["we_corr"] = 0; //              for easy word
    cnt_trial_type["wh_corr"] = 0; //              for hard word
    // adding problem-solving RTs to get the average
    cnt_trial_type["me_rt"] = 0;
    cnt_trial_type["mh_rt"] = 0;
    cnt_trial_type["we_rt"] = 0;
    cnt_trial_type["wh_rt"] = 0;

    for (var ii = 0; ii < choice_main.length; ii++) {
        // counting the # of trial types to get the choice probabilities
        // all the problem types need to be defined above.
        cnt_trial_type[choice_main[ii]]++;
        // add up the # of corrects and RT
        let curr_type = choice_main[ii].substring(0, 2);
        cnt_trial_type[curr_type + "_cnt"]++;
        cnt_trial_type[curr_type + "_corr"] += correct_main[ii];
        cnt_trial_type[curr_type + "_rt"] += solvetime_main[ii];
    }

    var mwlevel = {}; // based on history_hard
    mwlevel["m"] = 0;
    mwlevel["w"] = 0;
    for (var ii = 0; ii < choice_level.length; ii++) {
        mwlevel[choice_level[ii][0]] += Number(choice_level[ii][1]);
    }
    var rtsum = 0;
    for (var ii = 0; ii < solvetime_main.length; ii++) {
        // add all the problem-solving RT to see how much time P spent
        rtsum += solvetime_main[ii];
    }


    /* Change 5: Saving the trial-level data and finishing up */

    // Overall
    Qualtrics.SurveyEngine.setEmbeddedData("points", point_main);
    Qualtrics.SurveyEngine.setEmbeddedData("bonus", point_main); // 1 cent/point

    // easy_math_cnt, easy_acc_math, easy_RT_math 
    Qualtrics.SurveyEngine.setEmbeddedData("easy_math_cnt", cnt_trial_type["me_cnt"] );
    Qualtrics.SurveyEngine.setEmbeddedData("easy_acc_math", (cnt_trial_type["me_corr"]/cnt_trial_type["me_cnt"]).toFixed(4) );
    Qualtrics.SurveyEngine.setEmbeddedData("easy_RT_math", Math.round(cnt_trial_type["me_rt"]/cnt_trial_type["me_cnt"]) );

    // easy_word_cnt, easy_acc_word, easy_RT_word
    Qualtrics.SurveyEngine.setEmbeddedData("easy_word_cnt", cnt_trial_type["we_cnt"] );
    Qualtrics.SurveyEngine.setEmbeddedData("easy_acc_word", (cnt_trial_type["we_corr"]/cnt_trial_type["we_cnt"]).toFixed(4) );
    Qualtrics.SurveyEngine.setEmbeddedData("easy_RT_word", Math.round(cnt_trial_type["we_rt"]/cnt_trial_type["we_cnt"]) );

    // hard_math_cnt, hard_level_math, hard_acc_math, hard_RT_math
    Qualtrics.SurveyEngine.setEmbeddedData("hard_math_cnt", cnt_trial_type["mh_cnt"] );
    Qualtrics.SurveyEngine.setEmbeddedData("hard_level_math", (mwlevel["m"]/cnt_trial_type["mh_cnt"]).toFixed(4) );
    Qualtrics.SurveyEngine.setEmbeddedData("hard_acc_math", (cnt_trial_type["mh_corr"]/cnt_trial_type["mh_cnt"]).toFixed(4) );
    Qualtrics.SurveyEngine.setEmbeddedData("hard_RT_math", Math.round(cnt_trial_type["mh_rt"]/cnt_trial_type["mh_cnt"]) );

    // hard_word_cnt, hard_level_word, hard_acc_word, hard_RT_word                
    Qualtrics.SurveyEngine.setEmbeddedData("hard_word_cnt", cnt_trial_type["wh_cnt"] );
    Qualtrics.SurveyEngine.setEmbeddedData("hard_level_word", (mwlevel["w"]/cnt_trial_type["wh_cnt"]).toFixed(4) );
    Qualtrics.SurveyEngine.setEmbeddedData("hard_acc_word", (cnt_trial_type["wh_corr"]/cnt_trial_type["wh_cnt"]).toFixed(4) );
    Qualtrics.SurveyEngine.setEmbeddedData("hard_RT_word", Math.round(cnt_trial_type["wh_rt"]/cnt_trial_type["wh_cnt"]) );

    // hard choice probabilities of math trials : hcp_h2e2_math, hcp_h3e2_math, hcp_h4e2_math, hcp_h5e2_math, hcp_h6e2_math, hcp_h456e2_math
    let numPerCond = 2*num_block;
    Qualtrics.SurveyEngine.setEmbeddedData("hcp_h2e2_math", (cnt_trial_type["mh0"]/numPerCond).toFixed(4) );
    Qualtrics.SurveyEngine.setEmbeddedData("hcp_h3e2_math", (cnt_trial_type["mh1"]/numPerCond).toFixed(4) );
    Qualtrics.SurveyEngine.setEmbeddedData("hcp_h4e2_math", (cnt_trial_type["mh2"]/numPerCond).toFixed(4) );
    Qualtrics.SurveyEngine.setEmbeddedData("hcp_h5e2_math", (cnt_trial_type["mh3"]/numPerCond).toFixed(4) );
    Qualtrics.SurveyEngine.setEmbeddedData("hcp_h6e2_math", (cnt_trial_type["mh4"]/numPerCond).toFixed(4) );
    Qualtrics.SurveyEngine.setEmbeddedData("hcp_h456e2_math",
            ((cnt_trial_type["mh2"]+cnt_trial_type["mh3"]+cnt_trial_type["mh4"])/(3*numPerCond)).toFixed(4) );

    // hard choice probabilities of word trials : hcp_h2e2_word, hcp_h3e2_word, hcp_h4e2_word, hcp_h5e2_word, hcp_h6e2_word, hcp_h456e2_word
    Qualtrics.SurveyEngine.setEmbeddedData("hcp_h2e2_word", (cnt_trial_type["wh0"]/numPerCond).toFixed(4) );
    Qualtrics.SurveyEngine.setEmbeddedData("hcp_h3e2_word", (cnt_trial_type["wh1"]/numPerCond).toFixed(4) );
    Qualtrics.SurveyEngine.setEmbeddedData("hcp_h4e2_word", (cnt_trial_type["wh2"]/numPerCond).toFixed(4) );
    Qualtrics.SurveyEngine.setEmbeddedData("hcp_h5e2_word", (cnt_trial_type["wh3"]/numPerCond).toFixed(4) );
    Qualtrics.SurveyEngine.setEmbeddedData("hcp_h6e2_word", (cnt_trial_type["wh4"]/numPerCond).toFixed(4) );
    Qualtrics.SurveyEngine.setEmbeddedData("hcp_h456e2_word",
            ((cnt_trial_type["wh2"]+cnt_trial_type["wh3"]+cnt_trial_type["wh4"])/(3*numPerCond)).toFixed(4) );

    Qualtrics.SurveyEngine.setEmbeddedData("cnt_per_cond", numPerCond );

    // finishing up
    function sleep(time) {
        return new Promise((resolve) => setTimeout(resolve, time));
    }

    sleep(500).then(() => {
        // clear the stage
        jQuery('.display_stage').remove();
        jQuery('.display_stage_background').remove();

        // simulate click on Qualtrics "next" button, making use of the Qualtrics JS API
        qthis.clickNextButton();
    });
}
```
