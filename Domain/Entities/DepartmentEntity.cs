﻿using Domain.Common.Interface;
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
        public string DepartmentNr { get; set; } = string.Empty;

        [Required]
        public string Name { get; set; } = string.Empty;
    }
}
