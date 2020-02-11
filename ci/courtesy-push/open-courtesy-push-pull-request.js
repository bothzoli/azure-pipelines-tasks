const azdev = require('azure-devops-node-api');

const orgUrl = "https://dev.azure.com/mseng";
const token = process.env.TOKEN;
if (!token) {
    throw new Exception('No token provided');
}
const releaseBranch = process.argv[2];
if (!releaseBranch) {
    throw new Exception('No release branch provided');
}
const azureDevOpsRepoId = "fb240610-b309-4925-8502-65ff76312c40";
const project = "AzureDevOps";

const pullRequestToCreate = {sourceRefName: `refs/heads/${releaseBranch}`,
                             targetRefName: 'refs/heads/master',
                             title: 'Courtesy Bump of Tasks',
                             description: 'Autogenerated PR to bump the versions of our first party tasks'
                            };

let authHandler = azdev.getPersonalAccessTokenHandler(token); 
let connection = new azdev.WebApi(orgUrl, authHandler);
connection.getGitApi().then(gitApi => {
    gitApi.createPullRequest(pullRequestToCreate, azureDevOpsRepoId, project);
});
