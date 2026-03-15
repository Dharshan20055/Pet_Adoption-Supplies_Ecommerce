package com.petadoption.supplies.util;

import java.util.UUID;

public class UUIDUtil {

    public static String generateId(){
        return UUID.randomUUID().toString();
    }

}