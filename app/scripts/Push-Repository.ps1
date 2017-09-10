Param(
  [string]$token,
  [string]$branch
)

$pushUrl =  "https://github.com/hugodupan/TemplateCRUD.git";
$branchRef = "head:$branch"

if($branch.Contains("dev") -Or $branch.Contains("master")){
    git.exe push $pushUrl $branchRef;
    Write-Host "Branch $branch updated on GitHub";
}else{
    Write-Host "Branch $branch ignored on GitHub";  
}