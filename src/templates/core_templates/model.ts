export function model(){
    return `part of '../core_imports.dart';

    abstract class Model {}
    
    abstract class ApiReader {
      ApiReader fromJson(Map<String, dynamic> json);
      Entity generateEntity();
    }
    
    abstract class ApiWriter {
      ApiWriter generateApiBody();
    }
    `;
}