using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace DnDApi.Database
{
    [Table("Company")]
    public partial class Company
    {
        public Company()
        {
            Projects = new HashSet<Project>();
        }

        [Key]
        [Column("Company_ID")]
        public int CompanyId { get; set; }
        [StringLength(50)]
        [Unicode(false)]
        public string CompanyName { get; set; }
        [Column("Address_ID")]
        public int AddressId { get; set; }
        [Required]
        public bool? Activated { get; set; }

        [ForeignKey("AddressId")]
        [InverseProperty("Companies")]
        public virtual Address Address { get; set; } 
        [InverseProperty("Company")]
        public virtual ICollection<Project> Projects { get; set; }
    }
}
