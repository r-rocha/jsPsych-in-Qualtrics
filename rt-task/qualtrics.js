Qualtrics.SurveyEngine.addOnload(function () {

    /*Place your JavaScript here to run when the page loads*/

    var jslib_url = "https://kywch.github.io/jsPsych-in-Qualtrics/";

    var requiredResources = [
        jslib_url + "jspsych.js",
        jslib_url + "plugins/jspsych-html-keyboard-response.js",
        jslib_url + "plugins/jspsych-image-keyboard-response.js",
        jslib_url + "rt-task_main.js"
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

        jsPsych.init({
            timeline: timeline,
            display_element: 'display_stage',
            on_finish: function (data) {
                // clear the stage
                jQuery('display_stage').remove();
                jQuery('display_stage_background').remove();

                // summarize the results
                var trials = jsPsych.data.get().filter({
                    test_part: 'test'
                });
                var correct_trials = trials.filter({
                    correct: true
                });
                var accuracy = Math.round(correct_trials.count() / trials.count() * 100);
                var rt = Math.round(correct_trials.select('rt').mean());

                // save to qualtrics embedded data
                Qualtrics.SurveyEngine.setEmbeddedData("accuracy", accuracy);
                Qualtrics.SurveyEngine.setEmbeddedData("rt", rt);

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

    var trials = jsPsych.data.get().filter({
        test_part: 'test'
    });
    var correct_trials = trials.filter({
        correct: true
    });
    var accuracy = Math.round(correct_trials.count() / trials.count() * 100);
    var rt = Math.round(correct_trials.select('rt').mean());

    console.log(accuracy);
    console.log(rt);

});