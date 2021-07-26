using RoleBasedAuthorization.Core.Categories;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace RoleBasedAuthorization.Core.Products
{
    public class Product: BaseEntity
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public string Metadata { get; set; }

        public int CategoryId { get; set; }
        [ForeignKey("CategoryId")]
        public Category Category { get; set; }
        [NotMapped]
        public string CategoryName { 
            get 
            {
                if (Category != null)
                {
                    return Category.Name;
                }
                else
                {
                    return "";
                }
            } 
        }

    }
}
