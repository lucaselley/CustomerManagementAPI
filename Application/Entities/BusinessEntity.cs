using Application.Entities.EntityBase;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Entities {
    public class BusinessEntity : BaseEntity {

        [Required]
        public int CVRnr { get; set; }
    }
}
