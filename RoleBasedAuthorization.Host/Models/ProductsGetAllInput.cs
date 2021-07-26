using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RoleBasedAuthorization.Host.Models
{
    public class ProductsGetAllInput : PagedAndSortedRequestDto
    {
        public string Filter { get; set; }
    }
}
