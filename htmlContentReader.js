const fs = require("fs");

function extractValuesFromHTML(htmlContent) {
    const $ = JSON.parse(fs.readFileSync(htmlContent, 'utf8'));
    const passedScenariosValue = $.stats.expected;
    const failedScenariosValue = $.stats.unexpected;
    const skippedScenariosValue = $.stats.skipped;
    const flakyValue = $.stats.flaky
    const allScenariosValue = passedScenariosValue + failedScenariosValue + skippedScenariosValue +flakyValue

    const extractedValues = {
        allScenarios: allScenariosValue,
        passedScenarios: passedScenariosValue,
        failedScenarios: failedScenariosValue,
        skippedScenarios: skippedScenariosValue,
    };

    return extractedValues;
}
module.exports = { extractValuesFromHTML };
