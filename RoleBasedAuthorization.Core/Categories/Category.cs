using System;
using System.Collections.Generic;
using System.Text;

namespace RoleBasedAuthorization.Core.Categories
{
    public class Category : BaseEntity
    {
        public string Name { get; set; }
        public string Metadata { get; set; }
    }
}
