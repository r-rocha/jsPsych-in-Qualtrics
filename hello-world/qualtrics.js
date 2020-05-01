Qualtrics.SurveyEngine.addOnload(function () {

    var dev_url = "https://users.rcc.uchicago.edu/~kywch/BDS_201909/jsdev/";

    var jsPsychResources = [
        dev_url + "jspsych.js",
        dev_url + "jspsych-fullscreen.js",
        dev_url + "jspsych-instructions.js",
        dev_url + "jspsych-html-keyboard-response.js",
        dev_url + "jspsych-multi-html-noresp.js",
        dev_url + "jspsych-numpad-response.js",
        dev_url + "digit_span.js"
    ];

    function loadScript(idx) {
        console.log("Loading ", jsPsychResources[idx]);
        jQuery.getScript(jsPsychResources[idx], function () {
            if ((idx + 1) < jsPsychResources.length) {
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

    // load necessary components for this experiment
    if (window.Qualtrics && (!window.frameElement || window.frameElement.id !== "mobile-preview-view")) {
        loadScript(0);
    }

    // set the display stage
    jQuery('<div class = display_stage_background></div>').appendTo('body');
    jQuery('<div class = display_stage></div>').appendTo('body');

    function initExp() {
        // get participant id
        sbjId = "${e://Field/workerId}";
        sbjId = sbjId.trim();
        if (sbjId.length == 0) {
            console.log("No participant id. Stopping the experiment.");
            //return false;
        }

        task_id = "bds_T3"
        data_dir = "data01";

        /* ************************************ */
        /* Main experiment sequence */
        /* ************************************ */

        if (flag_debug) {
            var digit_sequence = [3, 4, 5];
        } else {
            var digit_sequence = [3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12];
        }

        var jspsych_session = [];

        // use the full screen
        jspsych_session.push({
            type: 'fullscreen',
            fullscreen_mode: true
        });

        // main session
        jspsych_session.push({
            timeline: generate_backward_block(digit_sequence)
        });

        // exit the full screen
        jspsych_session.push({
            type: 'fullscreen',
            fullscreen_mode: false
        })

        jsPsych.init({
            timeline: jspsych_session,
            display_element: document.querySelector('.display_stage'),
            on_finish: function (data) {

                // save the whole experiment data to the server
                save_data();

                // a quick summary of the session
                // correct count
                // num_digit
                // RT summ
                var numCorr = Math.round(corr_history.reduce(function (a, b) {
                    return (a + b);
                }, 0)).toString();
                console.log("Number of corrects: ", numCorr);

                // variables to generate & pass to Qualtrics
                Qualtrics.SurveyEngine.setEmbeddedData("BDScore_T3", numCorr);
                Qualtrics.SurveyEngine.setEmbeddedData("maxLevel_T3", max_level.toString());

                // simulate click on Qualtrics "next" button, making use of the Qualtrics JS API
                qthis.clickNextButton();

                // clear the stage
                jQuery('.display_stage').remove();
                jQuery('.display_stage_background').remove();

            }
        });
    }
});