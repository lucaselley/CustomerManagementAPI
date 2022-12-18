using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities.EntityBase {

    //Sole purpose is to put this class "between" base entity and entities that needs the enum property.
    public class EnumBaseEntity : BaseEntity {

        public enum CustomerRelation { Unknown, Good, Bad };

        public CustomerRelation _CustomerRelation { get; set; }

    }
}
