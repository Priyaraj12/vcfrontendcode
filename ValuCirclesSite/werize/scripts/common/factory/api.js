(function ()
{
    'use strict';

    angular
        .module('apicommon',[])
        .factory('api', apiService);

    /** @ngInject */
    function apiService(getcokkies)
    {
        
        var api = {};

        // Base Url
		//api.baseUrl = 'http://13.235.118.32/StagingService';
      api.baseUrl = 'http://localhost:8081/StagingService';
//      api.baseUrl = 'https://valucircles.com/StagingService';
 //     api.baseUrl = 'http://192.168.1.3:8081/StagingService';

        ////=====- Customer Personal APIs -=====////
        api.personal = {
                    getSummaryDetails                           : api.baseUrl + '/user/getSummaryDetails?sessionId=',
                    getZipInfo                                  : api.baseUrl + '/user/getZipInfo?sessionId=',
                    getEducationInstitution                     : api.baseUrl + '/user/getEducationInstitutionByEducationDetailId?sessionId=',
                    getEducationDetail                          : api.baseUrl + '/user/getEducationDetailByEducationId?sessionId=',
                    savePersonal                                : api.baseUrl + '/user/insertUserData?sessionId='
                    
        };

        ////=====- Customer financial APIs -=====////
        api.financial = {
                    getListOfRefEmploymentType                  : api.baseUrl + '/user/getListOfRefEmploymentType?sessionId=',
                    insertFinancialData                         : api.baseUrl + '/user/insertFinancialData?sessionId=',
                    insertUserFinancial                         : api.baseUrl + '/user/insertUserFinancial?sessionId=',
                    insertUserDetailsForCreditScore             : api.baseUrl + '/user/insertUserDetailsForCreditScore?sessionId=',
                    getUserDetailsForCreditScore                : api.baseUrl + '/user/getUserDetailsForCreditScore?sessionId=',
                    getListOfEmployer                           : api.baseUrl + '/user/getListOfEmployer?sessionId=',
                    getcompanylistusingprobe					: api.baseUrl + '/user/getcompanylistusingprobe?sessionId=',
                    getcompanylistusingcin						: api.baseUrl + '/user/getcompanylistusingcin?sessionId=',
                    getCoApplicantId                            : api.baseUrl + '/user/getCoApplicantId?sessionId=',
                    getCoApplicantDetailsUsingListOfUserId      : api.baseUrl + '/user/getCoApplicantDetailsUsingListOfUserId?sessionId=',
                    getListOfOccupationCategory			        : api.baseUrl + '/user/getListOfOccupationCategory?sessionId=',
                 //   getcreditproofDetails						: api.baseUrl + 'user/getUserDetailsForCreditScore?sessionId='
        };

        ////=====- Customer coApplicant APIs -=====////
        api.coApplicant = {
                    insertMultipleUserCoApplicantwithLogin      : api.baseUrl + '/user/insertMultipleUserCoApplicantwithLogin?sessionId=',
                    getCoApplicantId                            : api.baseUrl + '/user/getCoApplicantId?sessionId=',
                    getCoApplicantDetailsUsingListOfUserId      : api.baseUrl + '/user/getCoApplicantDetailsUsingListOfUserId?sessionId=',
                    getZipInfo                                  : api.baseUrl + '/user/getZipInfo?sessionId=',
                    getEducationDetailByEducationId             : api.baseUrl + '/user/getEducationDetailByEducationId?sessionId=',
                    getEducationInstitutionByEducationDetailId  : api.baseUrl + '/user/getEducationInstitutionByEducationDetailId?sessionId=',
                    fetchPrimaryaddress							: api.baseUrl + '/user/fetchPrimaryaddress?sessionId='
        };

        ////=====- Customer coApplicant APIs -=====////
        api.lpi = {
                    insertUserSubcription                       : api.baseUrl + '/user/insertUserSubcription?sessionId=',
                    getLpiPageListApi                           : api.baseUrl + '/user/getLpiPageListApi?sessionId=',
                    getUserLenderLpiScore                       : api.baseUrl + '/user/getUserLenderLpiScore?sessionId=',
                    getSubcriptionKey                           : api.baseUrl + '/user/getSubcriptionKey?sessionId=',
                    updateLoginUserLpiStatus                    : api.baseUrl + '/user/updateLoginUserLpiStatus?sessionId=',
                    getlenderapplications						: api.baseUrl + '/user/getlenderapplications?sessionId=',
                    getlenderapplicationstatus					: api.baseUrl + '/user/getlenderapplicationstatus?sessionId=',
                    getlenderapplicationsanctions   			: api.baseUrl + '/user/getlenderapplicationsanctions?sessionId=',
                    getlenderapplicationdisbursements           : api.baseUrl + '/user/getlenderapplicationdisbursements?sessionId=',
                    insertlenderdetails							: api.baseUrl + '/user/applyselectedloans?sessionId=',
                    getCoApplicantId                            : api.baseUrl + '/user/getCoApplicantId?sessionId=',
                    getCoApplicantDetailsUsingListOfUserId      : api.baseUrl + '/user/getCoApplicantDetailsUsingListOfUserId?sessionId='
        };

        ////=====- Customer coApplicant APIs -=====////
        api.account = {
                    changePassword                              : api.baseUrl + '/user/changepassword?sessionId=',
                    signUp                                      : api.baseUrl + '/user/signUp',
                    otpVerify                                   : api.baseUrl + '/user/otpverify',
                    resendOtp                                   : api.baseUrl + '/user/resendOtp'
        };

        ////=====- Customer coApplicant APIs -=====////
        api.sponsor = {
                    getSubscriptionSponsor                      : api.baseUrl + '/user/getSubscriptionSponsor',
                    selectedSubscription                        : api.baseUrl + '/user/selectedSubscription'
        };
         
        ////=====- Asset APIs -=====//// 
        api.asset = {

                    getZipInfo                                  : api.baseUrl + '/user/getZipInfo?sessionId=',
                    getAssetProductType                         : api.baseUrl + '/user/getAssetProductType?sessionId=',
                    getAssetType                                : api.baseUrl + '/user/getAssetType?sessionId=',
                    getBuilderProjectListForZipCode             : api.baseUrl + '/builder/getBuilderProjectListForZipCode?sessionId=',
                    loanTerm                                    : api.baseUrl + '/user/loanTerm?sessionId=',
                    getListOfBuilderProjectAndZipCode           : api.baseUrl + '/builder/getListOfBuilderProjectAndZipCode?sessionId=',
                    insertUserAsset                             : api.baseUrl + '/builder/insertUserAsset?sessionId=',
                    insertUserFinancial                         : api.baseUrl + '/user/insertUserFinancial?sessionId=',
                    getProjectName                              : api.baseUrl + '/builder/getListOfBuilderProjectUsingBuilderId1?sessionId=',
                    getListOfCities                             : api.baseUrl + '/builder/getListOfCities?sessionId=',
                    getListOfCitiesBasedBuilderName             : api.baseUrl + '/builder/getBuilderUsingCity?sessionId=',
                    getPages                                    : api.baseUrl + '/user/getpages?sessionId=',
                    getRefloantimeframe                         : api.baseUrl + '/user/getRefloantimeframe?sessionId='
                    

        }; 

        api.bankverification = {

                    getPerfiosUserBankAccountsAndTransaction     : api.baseUrl + '/yodlee/getPerfiosUserBankAccountsAndTransaction',
                    getListOfPerfiosUserBankAccount              : api.baseUrl + '/yodlee/getListOfPerfiosUserBankAccount',
                    getTransactionToVerifyIncomeAndLoan          : api.baseUrl + '/yodlee/getTransactionToVerifyIncomeAndLoan?sessionId=',
                    getVerifyUserIncomeAndLoan                   : api.baseUrl + '/user/getVerifyUserIncomeAndLoan?sessionId=',
                    insertIncomeAndLoanByUserSelected            : api.baseUrl + '/yodlee/insertIncomeAndLoanByUserSelected?sessionId=',                                
                    deletePerfiosBankAccount                     : api.baseUrl + '/yodlee/deletePerfiosBankAccount?sessionId=',

        }; 

        ////=====- Customer coApplicantFinancial APIs -=====////
        api.coApplicantFinancial = {
                    getCoApplicantId                            : api.baseUrl + '/user/getCoApplicantId?sessionId=',
                    getCoApplicantEmploymentAndIncomeLoan       : api.baseUrl + '/user/getCoApplicantEmploymentAndIncomeLoan?sessionId=',
                    insertMultipleUserCoApplicantFinancials     : api.baseUrl + '/user/insertMultipleUserCoApplicantFinancials?sessionId=',
                    insertUserCoApplicantFinancial              : api.baseUrl + '/user/insertUserCoApplicantFinancial?sessionId=',
                    getListOfAllGetMethodFinancial              : api.baseUrl + '/user/getListOfAllGetMethodFinancial?sessionId=',
                    getCoApplicantDetailsUsingListOfUserId      : api.baseUrl + '/user/getCoApplicantDetailsUsingListOfUserId?sessionId=',
                    getListOfOccupationCategory			        : api.baseUrl + '/user/getListOfOccupationCategory?sessionId=',
                    
        };

        return api;
    }

})();
