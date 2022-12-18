using Domain.Common.Interface;
using Domain.Entities.EntityBase;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class DepartmentEntity : EnumBaseEntity, IAuditable
    {
        [Required]
        public int DepartmentNr { get; set; }
    }
}
