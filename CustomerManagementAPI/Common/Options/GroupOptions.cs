using System.ComponentModel.DataAnnotations;

namespace CustomerManagementAPI.Common.Options {
    public class GroupOptions {

        //Boiler plate

        public const string Section = "AzureAdAcceptedGroups";

        //Add required for potential better troubleshooting ability in case of error

        [Required(ErrorMessage = "Accepted group ID's required")]
        public string Basic { get; set; } = string.Empty;
        [Required(ErrorMessage = "Accepted group ID's required")]
        public string Admin { get; set; } = string.Empty;
    }
}
