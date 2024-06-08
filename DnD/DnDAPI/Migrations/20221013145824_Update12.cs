using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DnDApi.Migrations
{
    public partial class Update12 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "FuelSlip",
                table: "Fuel_Price",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FuelSlip",
                table: "Fuel_Price");
        }
    }
}
