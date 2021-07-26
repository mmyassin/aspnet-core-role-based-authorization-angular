using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RoleBasedAuthorization.Host.Models
{
    public class PagedResultDto<T>
    {
        public int Total { get; set; }
        public List<T> Data { get; set; }
    }
}
