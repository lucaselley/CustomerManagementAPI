using Domain.Common.Interface;
using Domain.Entities.EntityBase;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities {
    public class BusinessEntity : EnumBaseEntity, IAuditable {

        [Required]
        [StringLength(8, ErrorMessage = "CVRnr must be 8 characters")]
        public string CVRnr { get; set; } = string.Empty;

        [Required]
        public string Name { get; set; } = string.Empty;

    }
}
