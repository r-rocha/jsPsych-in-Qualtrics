# Saving jsPsych data to a web server using PHP

You can save the aggregated data to Qualtrics, but you may also want to look at the trial-level data for further analysis. 
**If you have access to a web server that can run PHP**, then you can save each participant's data as a CSV or JSON file on the server.

---

## Step 0. Getting access to a web server

Your institution usually provides you a free access to a web server, so that you can run your personal web site.
If you are not familiar with web servers and PHP, please please ask your IT professional for help. 
**They almost always can HELP you!** Also look for resources like below. 

* [UNL.edu: Prerequisites for hosting web content on your account/setting up your first PHP page](https://cse.unl.edu/faq-section/web-related)
* [NJIT.edu: Step by step instructions for beginners for creating a basic Web Page](https://ist.njit.edu/sites/ist.njit.edu/files/createwebpage_0.pdf)

---

## Step 1. Going into the `public_html` directory

If you have gained the access to a web server, login to the server and go to the `public_html` directory. If you are not sure, please read this page first: [Prerequisites for hosting web content on your account/how to setup your first PHP page](https://cse.unl.edu/faq-section/web-related).

Reading [this linux command cheatsheet](https://files.fosswire.com/2007/08/fwunixref.pdf) can also help.

```sh
$ cd ~/public_html
```

---

## Step 2. Setting up the directories for saving experiment files

Let's create a directory called `exp_data`, which will host necessary files and serve as a parent directory for your experiments by running three separate commands one-by-one.

This command makes a directory called `exp_data`:
```sh
$ mkdir exp_data
```

This command moves you into the `exp_data` directory:
```sh
$ cd exp_data
```

This command shows you where you are. So you should see something like `/home/<your-account>/public_html/exp_data`:
```sh
$ pwd
```

This command prevents others from seeing inside `exp_data` by creating an empty index html file:
```sh
$ touch index.html
```

This command makes sure that `index.html` hides the directory structure 
(for details of `.htaccess`, see [http://www.htaccess-guide.com/directoryindex-uses/](http://www.htaccess-guide.com/directoryindex-uses/))
```sh
$ echo "DirectoryIndex index.html" >> .htaccess
```

---

## Step 3. Creating the `save_data.php`

Let's create the PHP file that will receive and save your data by using `vi`. If you are not familiar with `vi`, 
please read [this guide for using the vi editor](https://www.cyberciti.biz/faq/linux-unix-vim-save-and-quit-command/).

This command will open an vi editor and let you edit it:
```sh
$ vi save_data.php
```

Copy-paste the below PHP code and save, then you are done with this step:
```php
<?php
// WARNING: the below config can cause a serious security issue.
// Please read https://portswigger.net/web-security/cors/access-control-allow-origin
// Once you are done testing, you should limit the access
//header('Access-Control-Allow-Origin: https://ssd.az1.qualtrics.com');
header('Access-Control-Allow-Origin: *');

// NOTE: the below code expects three fields and will NOT work if any of these is missing.
// - data_dir: specify the server directory to store data
// - file_name: specify the filename of the data being saved, which can include subject id
// - exp_data: contain the full json/csv data to be saved

if (isset($_POST['exp_data']) == false) { 
    echo('Hello'); 
    exit; 
}
$exp_data = $_POST['exp_data'];

/* prevent XSS:  */
$_POST = filter_input_array(INPUT_POST, FILTER_SANITIZE_STRING);

if (isset($_POST['data_dir']) == true)
{
    $data_dir = $_POST['data_dir']; // data directory
} else { exit; }

if (isset($_POST['file_name']) == true)
{
    $file_name = $_POST['file_name']; // mturk_id
} else { exit; }

// write the file to disk
// NOTE: you must make the data directory by all users
// For example, by running `chmod 772` to give a write access to EVERYONE
file_put_contents($data_dir.'/'.$file_name, $exp_data);

exit;
?>
```

Your `save_data.php` url will look like `https://<server-url>/~<your-account>/exp_data/save_data.php`, like my url -- [https://users.rcc.uchicago.edu/~kywch/exp_data/save_data.php](https://users.rcc.uchicago.edu/~kywch/exp_data/save_data.php). Note that the `exp_data/save_data.php` part should be the same if you followed the above steps.

If your script is running, you will see **Hello** in your browser.

---

## Step 4. Making an experiment directory

The above PHP script requires the experimenter to specify `data_dir`, in which experiment files are saved.
Here, let's create a folder called `hello-world` under `exp_data` and save files there.
Make sure that you are in the `exp_data` folder with `pwd`. 

This command makes a directory called `hello-world`:
```sh
$ mkdir hello-world
```

You also need to adjust this directory's permission so that the PHP script can save files. 
To learn more about permissions, see this page: [http://linuxcommand.org/lc3_lts0090.php](http://linuxcommand.org/lc3_lts0090.php).

This command allows the PHP script to write files in the `hello-world` directory, while preventing other people from seeing inside:
```sh
$ chmod 772 hello-world
```

---

## Step 5. Adding the save function to the experiment HTML script

The server side work is done. Now, you need to add scripts to send the result file when an experiment session is done.

The `experiment-with-display-element-save-php.html` file in [this GitHub repository](https://github.com/kywch/jsPsych-in-Qualtrics/blob/master/hello-world/experiment-with-display-element-save-php.html) contains three additional changes from `experiment-with-display-element.html`. When you open `experiment-with-display-element-save-php.html` in a browser, you should see the same "Hello world!". 

**<font color=red>In addtion, you will find new json and csv files under `hello-world` when you put correct url of `save_data.php` below.</font>**

We start from `experiment-with-display-element.html`, which you can see from [the Hello World! tutorial](hello-world.md#first-transformation-experiment-with-display-elementhtml). Let's look at these additional change.

### Change 4: Defining necessary variables for saving the results

The above `save_data.php` expects three fields -- `data_dir`, `file_name`, and `exp_data` -- and will NOT work if any of these is missing.

* `data_dir` specifies the server directory to store data. You may want to include `task_name` in the directory name.
* `file_name` specifies the filename of the result file. You may want to include the subject id. 
* `exp_data` contains the full json/csv data to be saved.

**<font color=red>You need to replace `save_url` with your save_data.php url.</font>**

```js
// experimental session-defining variables
var task_name = "hello-world";
var sbj_id = "test01";

// you must put your save_data php url here.
var save_url = "https://users.rcc.uchicago.edu/~kywch/exp_data/save_data.php";
var data_dir = task_name;

// my preference is to include the task and sbj_id in the file name
var file_name = task_name + '_' + sbj_id; 
```

### Change 5. Defining save functions using jQuery

Qualtrics loads `jQuery` by default, so you can use `jQuery` for saving files. 
However, this html script must load `jQuery` library to use the save function.

```html
<script src='https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js'></script>
```

You can use either the JSON or CSV format, whichever convenient for you. The save functions look like this.

```js
function save_data_json() {
    jQuery.ajax({
        type: 'post',
        cache: false,
        url: save_url,
        data: {
            data_dir: data_dir,
            file_name: file_name + '.json', // the file type should be added
            exp_data: jsPsych.data.get().json()
        }
    });
}

function save_data_csv() {
    jQuery.ajax({
        type: 'post',
        cache: false,
        url: save_url,
        data: {
            data_dir: data_dir,
            file_name: file_name + '.csv', // the file type should be added
            exp_data: jsPsych.data.get().csv()
        }
    });
}
```

### Change 6: Sending the results file upon completion

The `on_finish` callback can be declared in the `jsPsych.init` method. 
For details, see [the original jsPsych tutorial](https://www.jspsych.org/overview/callbacks/#on_finish-experiment).
The callback will trigger once all trials in the experiment have been run, so it is a great place to call save functions.

**NOTE: Here, both `save_data_json()` and `save_data_csv()` were called to show how these can be used. Choose one.**

```js
    jsPsych.init({
        timeline: [hello_trial],
        display_element: 'display_stage',
        
        /* Change 6: Sending the results file upon completion */
        on_finish: function() {
            save_data_json();
            save_data_csv();
        }
    })
```

### Putting it all together

So the `experiment-with-display-element-save-php.html` code looks like this. This html file should save the result files to your server.

```html
<!DOCTYPE html>
<html>

<head>
    <title>My experiment</title>
    <!-- Change 5: Defining save functions using jQuery -->
    <script src='https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js'></script>
    <script src="jspsych-6.1.0/jspsych.js"></script>
    <script src="jspsych-6.1.0/plugins/jspsych-html-keyboard-response.js"></script>
    <link href="jspsych-6.1.0/css/jspsych.css" rel="stylesheet" type="text/css">
    </link>
</head>

<body>

    <!-- Change 3: Adding extra scripts for Qualtrics -->
    <!-- COPY PASTE TO QUALTRICS FROM HERE -->
    <link href="https://kywch.github.io/jsPsych/css/jspsych.css" rel="stylesheet" type="text/css">
    </link>
    <div>
        <span style="font-size: 24px;">
            <br><br>
            If you are seeing this message for <span style="color: rgb(255, 0, 0);"><b>more than 5
                    minutes</b></span>,<br>
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
    </style>
    <!-- COPY PASTE TO QUALTRICS UP TO HERE -->

    <div id='display_stage_background'></div>
    <div id='display_stage'></div>

</body>

<script>

    /* Change 4: Defining necessary variables for saving the results */
    // experimental session-defining variables
    var task_name = "hello-world";
    var sbj_id = "test01";

    // you must put your save_data php url here.
    var save_url = "https://users.rcc.uchicago.edu/~kywch/exp_data/save_data.php";
    var data_dir = task_name;

    // my preference is to include the task and sbj_id in the file name
    var file_name = task_name + '_' + sbj_id; 

    /* Change 5: Defining save functions using jQuery */
    function save_data_json() {
        jQuery.ajax({
            type: 'post',
            cache: false,
            url: save_url,
            data: {
                data_dir: data_dir,
                file_name: file_name + '.json', // the file type should be added
                exp_data: jsPsych.data.get().json()
            }
        });
    }

    function save_data_csv() {
        jQuery.ajax({
            type: 'post',
            cache: false,
            url: save_url,
            data: {
                data_dir: data_dir,
                file_name: file_name + '.csv', // the file type should be added
                exp_data: jsPsych.data.get().csv()
            }
        });
    }

    var hello_trial = {
        type: 'html-keyboard-response',
        stimulus: 'Hello world!'
    }

    /* Change 1: Using `display_element` */
    jsPsych.init({
        timeline: [hello_trial],
        display_element: 'display_stage',
        
        /* Change 6: Sending the results file upon completion */
        on_finish: function() {
            save_data_json();
            save_data_csv();
        }
    })
</script>

</html>
```

---

## Step 6. Using the save function from Qualtrics


The `qualtrics-save-php.js` file in [this GitHub repository](https://github.com/kywch/jsPsych-in-Qualtrics/blob/master/hello-world/qualtrics-save-php.js) contains additional changes from `qualtrics.js` and `experiment-with-display-element-save-php.html` and can be direclty copy-pasted into the Qualtrics Question JavaScript Editor.

We start from `qualtrics.js`, which you can see from [the Hello World! tutorial](hello-world.md#second-transformation-qualtricsjs). 
Let's look at these additional change.

### Change 6: Define necessary variables and functions for saving the results

The below javascript defines necessary variables and functions for saving the results.

The above `save_data.php` expects three fields -- `data_dir`, `file_name`, and `exp_data` -- and will NOT work if any of these is missing.

* `data_dir` specifies the server directory to store data. You may want to include `task_name` in the directory name.
* `file_name` specifies the filename of the data being saved. You may want to include the subject id. For how to do so in Qualtrics, please see the below resources.
    * [Qualtrics.com: Assigning Randomized IDs to Respondents](https://www.qualtrics.com/support/survey-platform/common-use-cases-rc/assigning-randomized-ids-to-respondents/)
    * [Brown.edu: Use Qualtrics for Human Subject Research: Using Pre-Generated Participant IDs](https://ithelp.brown.edu/kb/articles/use-qualtrics-for-human-subject-research-using-pre-generated-participant-ids)
    * [Cloudresearch.com: WorkerID (And All MTurk Fields) Sent to Qualtrics](https://www.cloudresearch.com/resources/blog/workerid-and-all-mturk-fields-sent-to-qualtrics/)
* `exp_data` contains the full json/csv data to be saved.

**<font color=red>You need to replace `save_url` with your save_data.php url.</font>**

```js
// experimental session-defining variables
var task_name = "hello-world";
var sbj_id = "test01";

// you must put your save_data php url here.
var save_url = "https://users.rcc.uchicago.edu/~kywch/exp_data/save_data.php";
var data_dir = task_name;

// my preference is to include the task and sbj_id in the file name
var file_name = task_name + '_' + sbj_id; 

function save_data_json() {
    jQuery.ajax({
        type: 'post',
        cache: false,
        url: save_url,
        data: {
            data_dir: data_dir,
            file_name: file_name + '.json', // the file type should be added
            exp_data: jsPsych.data.get().json()
        }
    });
}

function save_data_csv() {
    jQuery.ajax({
        type: 'post',
        cache: false,
        url: save_url,
        data: {
            data_dir: data_dir,
            file_name: file_name + '.csv', // the file type should be added
            exp_data: jsPsych.data.get().csv()
        }
    });
}
```

### Change 7: Call the save function -- CHOOSE ONE!

The save function was added inside `on_finish`, which is called once all trials in the experiment have been run.

**NOTE: Here, both `save_data_json()` and `save_data_csv()` were called to show how these can be used. Choose one.**

```js
jsPsych.init({
    timeline: [hello_trial],
    display_element: 'display_stage',

    /* Change 5: Add the clean up and continue functions.*/
    on_finish: function (data) {

        /* Change 7: Call the save function -- CHOOSE ONE! */
        save_data_json();
        save_data_csv();

        // clear the stage
        jQuery('display_stage').remove();
        jQuery('display_stage_background').remove();

        // simulate click on Qualtrics "next" button, making use of the Qualtrics JS API
        qthis.clickNextButton();
    }
});
```

### Putting it all together

So the `qualtrics-save-php.js` code looks like this. Embed this script in Qualtrics by following [these steps](hello-world.md#finally-embedding-jspsych-in-qualtrics) and see whether your save function works.

```js
Qualtrics.SurveyEngine.addOnload(function () {

    /*Place your JavaScript here to run when the page loads*/

    /* Change 1: Hide the Next button */
    // Retrieve Qualtrics object and save in qthis
    var qthis = this;

    // Hide buttons
    qthis.hideNextButton();

    /* Change 2: Define and load required resources */
    var jslib_url = "https://kywch.github.io/jsPsych/";

    // the below urls must be accessible with your browser
    // for example, https://kywch.github.io/jsPsych/jspsych.js
    var requiredResources = [
        jslib_url + "jspsych.js",
        jslib_url + "plugins/jspsych-html-keyboard-response.js"
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

    /* Change 3: Append the display_stage Div using jQuery */
    // jQuery is loaded in Qualtrics by default
    jQuery("<div id = 'display_stage_background'></div>").appendTo('body');
    jQuery("<div id = 'display_stage'></div>").appendTo('body');

    /* Change 6: Define necessary variables and functions for saving the results */
    // experimental session-defining variables
    var task_name = "hello-world";
    var sbj_id = "test01";

    // you must put your save_data php url here.
    var save_url = "https://users.rcc.uchicago.edu/~kywch/exp_data/save_data.php";
    var data_dir = task_name;

    // my preference is to include the task and sbj_id in the file name
    var file_name = task_name + '_' + sbj_id; 

    function save_data_json() {
        jQuery.ajax({
            type: 'post',
            cache: false,
            url: save_url,
            data: {
                data_dir: data_dir,
                file_name: file_name + '.json', // the file type should be added
                exp_data: jsPsych.data.get().json()
            }
        });
    }

    function save_data_csv() {
        jQuery.ajax({
            type: 'post',
            cache: false,
            url: save_url,
            data: {
                data_dir: data_dir,
                file_name: file_name + '.csv', // the file type should be added
                exp_data: jsPsych.data.get().csv()
            }
        });
    }

    /* Change 4: Wrap jsPsych.init() in a function */
    function initExp() {

        var hello_trial = {
            type: 'html-keyboard-response',
            stimulus: 'Hello world!'
        }

        jsPsych.init({
            timeline: [hello_trial],
            display_element: 'display_stage',

            /* Change 5: Add the clean up and continue functions.*/
            on_finish: function (data) {

                /* Change 7: Call the save function -- CHOOSE ONE! */
                save_data_json();
                save_data_csv();

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

```

