using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RoleBasedAuthorization.Host.Models
{
    public class PagedAndSortedRequestDto
    {
        public int? Skip { get; set; }
        public int? Take { get; set; }
        public string Sort { get; set; }
    }
}
