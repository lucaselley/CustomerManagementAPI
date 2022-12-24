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
        public string CVRnr { get; set; } = string.Empty;
    }
}
