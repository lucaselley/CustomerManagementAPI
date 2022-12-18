using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Common.Interface {

    //Used by being inherited by entities that needs to be "Auditable", by inherithing from this, we can identify them before they get saved to the database. 
    public interface IAuditable {

    }
}
