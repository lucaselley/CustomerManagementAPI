using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Exceptions {
    public class NotFoundException : Exception {

        /// <summary>
        /// Custom exception - for when an entity is not found in DB
        /// </summary>
        /// <param name="message"></param>
        public NotFoundException(string message = "Entity not found") : base(message) {

        } 
    }
}
