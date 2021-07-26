using Microsoft.EntityFrameworkCore.Migrations;

namespace RoleBasedAuthorization.EFCore.Migrations
{
    public partial class UpdateProductsTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "description",
                table: "Products",
                newName: "Description");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Description",
                table: "Products",
                newName: "description");
        }
    }
}
