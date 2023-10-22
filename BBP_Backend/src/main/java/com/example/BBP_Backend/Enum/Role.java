package com.example.BBP_Backend.Enum;

public enum Role {
    CUSTOMER("Customer"),
    STAFF("Staff"),
    ADMIN("Admin");

    private String role;

    Role(String role) {
        this.role = role;
    }

    public String getRole() {
        return role;
    }
}
