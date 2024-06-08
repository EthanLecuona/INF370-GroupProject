using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace DnDApi.Database
{
    [Table("Project")]
    public partial class Project
    {
        [Key]
        [Column("Project_ID")]
        public int ProjectId { get; set; }
        [StringLength(50)]
        [Unicode(false)]
        public string Description { get; set; }
        [Column("Company_ID")]
        public int CompanyId { get; set; }
        [Unicode(false)]
        public string ProjectName { get; set; }

        [ForeignKey("CompanyId")]
        [InverseProperty("Projects")]
        public virtual Company Company { get; set; } 
    }
}
