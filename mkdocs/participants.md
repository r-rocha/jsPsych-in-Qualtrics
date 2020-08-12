# Recruiting Participants for Your jsPsych Qualtrics Experiments

The best advantage of using Qualtrics is that many participant recruiting services already offer easy tutorials for integrating Qualtrics with their services.

One important thing that you must check is how **participant IDs** are handled, which varies from one service to another. In this tutorial, [Saving Data with PHP](save-php.md#step-6-add-participand-id-to-qualtrics) and [Saving Data wit Dropbox](save-dropbox.md#step-4-add-participand-id-to-qualtrics), the Embedded Data `workerId` is determine the file name of each participant's experiment data. Should you use another name, you should also replace `workerId` with the name you use in the Qualtrics code `var sbj_id = "${e://Field/workerId}";`.

**Before launching your experiment, DOUBLE CHECK if the experiment files are saved with correct participant ID.** The beauty and peril of online experiments is the speed of data collection and thus the speed of spending money.

<h2>Participant recruiting services and their Qualtrics integration tutorial</h2>

I will keep adding the list below. If I missed something, please shoot me an email to  `choe_DOT_kyoung_AT_gmail_DOT_com`. Thanks!

* Qualtrics.com: [Assigning Randomized IDs](https://www.qualtrics.com/support/survey-platform/common-use-cases-rc/assigning-randomized-ids-to-respondents/), [Panel Company Integration](https://www.qualtrics.com/support/survey-platform/common-use-cases-rc/panel-company-integration/#ModifyingtheRedirectLinksProvicedByThePanelCompany)
* Your department's SONA System: [External Study Credit Granting with Qualtrics](https://www.sona-systems.com/help/qualtrics.aspx) 
    * Example tutorials from [Pitt.edu](http://www.pitt.edu/~subjpool/AutoCreditGranting.pdf) and [Missouristate.edu](https://psychology.missouristate.edu/assets/Psychology/Qualtrics_to_SONA_Flowchart_October_2014.pdf)
* Cloudresearch (TurkPrime): [WorkerID (And All MTurk Fields) Sent to Qualtrics](https://www.cloudresearch.com/resources/blog/workerid-and-all-mturk-fields-sent-to-qualtrics/)
* Prolific: [Recording participants` Prolific IDs in your study/survey](https://researcher-help.prolific.co/hc/en-gb/articles/360009220993-Recording-participants-ID-in-your-study-survey)


