using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RoleBasedAuthorization.Host.Models
{
    public class CategoriesGetAllInput : PagedAndSortedRequestDto
    {
        public string Filter { get; set; }
    }
}
