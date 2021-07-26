using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace RoleBasedAuthorization.Core
{
    public class BaseEntity
    {
        [Key]
        public int Id { get; set; }
        public DateTime CreationTime { get; set; }
        public DateTime? LastModificationTime { get; set; }
        public bool? IsDeleted { get; set; }
        public DateTime? DeletionTime { get; set; }
    }
}
