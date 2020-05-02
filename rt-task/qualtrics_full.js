Qualtrics.SurveyEngine.addOnload(function () {

    /*Place your JavaScript here to run when the page loads*/

    var jslib_url = "https://kywch.github.io/jsPsych-in-Qualtrics/";

    var requiredResources = [
        jslib_url + "jspsych.js",
        jslib_url + "plugins/jspsych-html-keyboard-response.js",
        jslib_url + "plugins/jspsych-image-keyboard-response.js"
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

    /* TASK TIMELINE JAVASCRIPT FROM HERE */

    /* create timeline */
    var timeline = [];

    /* define welcome message trial */
    var welcome_block = {
        type: "html-keyboard-response",
        stimulus: "Welcome to the experiment. Press any key to begin."
    };
    timeline.push(welcome_block);

    /* define instructions trial */
    var instructions = {
        type: "html-keyboard-response",
        stimulus: "<p>In this experiment, a circle will appear in the center " +
            "of the screen.</p><p>If the circle is <strong>blue</strong>, " +
            "press the letter F on the keyboard as fast as you can.</p>" +
            "<p>If the circle is <strong>orange</strong>, press the letter J " +
            "as fast as you can.</p>" +
            "<div style='width: 700px;'>" +
            "<div style='float: left;'><img src='" + jslib_url + "img/blue.png'></img>" +
            "<p class='small'><strong>Press the F key</strong></p></div>" +
            "<div class='float: right;'><img src='" + jslib_url + "img/orange.png'></img>" +
            "<p class='small'><strong>Press the J key</strong></p></div>" +
            "</div>" +
            "<p>Press any key to begin.</p>",
        post_trial_gap: 2000
    };
    timeline.push(instructions);

    /* test trials */

    var test_stimuli = [{
            stimulus: jslib_url + "img/blue.png",
            data: {
                test_part: 'test',
                correct_response: 'f'
            }
        },
        {
            stimulus: jslib_url + "img/orange.png",
            data: {
                test_part: 'test',
                correct_response: 'j'
            }
        }
    ];

    var fixation = {
        type: 'html-keyboard-response',
        stimulus: '<div style="font-size:60px;">+</div>',
        choices: jsPsych.NO_KEYS,
        trial_duration: function () {
            return jsPsych.randomization.sampleWithoutReplacement([250, 500, 750, 1000, 1250, 1500, 1750, 2000], 1)[0];
        },
        data: {
            test_part: 'fixation'
        }
    }

    var test = {
        type: "image-keyboard-response",
        stimulus: jsPsych.timelineVariable('stimulus'),
        choices: ['f', 'j'],
        data: jsPsych.timelineVariable('data'),
        on_finish: function (data) {
            data.correct = data.key_press == jsPsych.pluginAPI.convertKeyCharacterToKeyCode(data.correct_response);
        },
    }

    var test_procedure = {
        timeline: [fixation, test],
        timeline_variables: test_stimuli,
        repetitions: 5,
        randomize_order: true
    }
    timeline.push(test_procedure);

    /* define debrief */

    var debrief_block = {
        type: "html-keyboard-response",
        stimulus: function () {

            var trials = jsPsych.data.get().filter({
                test_part: 'test'
            });
            var correct_trials = trials.filter({
                correct: true
            });
            var accuracy = Math.round(correct_trials.count() / trials.count() * 100);
            var rt = Math.round(correct_trials.select('rt').mean());

            return "<p>You responded correctly on " + accuracy + "% of the trials.</p>" +
                "<p>Your average response time was " + rt + "ms.</p>" +
                "<p>Press any key to complete the experiment. Thank you!</p>";

        }
    };
    timeline.push(debrief_block);

    /* TASK TIMELINE JAVASCRIPT UP TO HERE */

    // Retrieve Qualtrics object and save in qthis
    var qthis = this;

    // Hide buttons
    qthis.hideNextButton();

    // load required resources (e.g., jsPsych and plugins) for this experiment
    if (window.Qualtrics && (!window.frameElement || window.frameElement.id !== "mobile-preview-view")) {
        loadScript(0);
    }

    // set the display stage, which is defined in css
    // jQuery is loaded in Qualtrics by default
    jQuery("<div id = 'display_stage_background'></div>").appendTo('body');
    jQuery("<div id = 'display_stage'></div>").appendTo('body');

    function initExp() {

        var hello_trial = {
            type: 'html-keyboard-response',
            stimulus: 'Hello world!'
        }

        jsPsych.init({
            timeline: [hello_trial],
            display_element: 'display_stage',
            on_finish: function (data) {
                // clear the stage
                jQuery('display_stage').remove();
                jQuery('display_stage_background').remove();

                // simulate click on Qualtrics "next" button, making use of the Qualtrics JS API
                qthis.clickNextButton();
            }
        });
    }
});

Qualtrics.SurveyEngine.addOnReady(function () {
    /*Place your JavaScript here to run when the page is fully displayed*/

});

Qualtrics.SurveyEngine.addOnUnload(function () {
    /*Place your JavaScript here to run when the page is unloaded*/

});