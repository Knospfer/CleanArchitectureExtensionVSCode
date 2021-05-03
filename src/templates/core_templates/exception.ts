export function exception(){
    return `part of '../core_imports.dart';

abstract class Exception implements Error {
  final String errorMessage;
  Exception(this.errorMessage);
}
    
abstract class ServerException implements Exception {
  final String errorMessage;
  ServerException(this.errorMessage);
}
    
abstract class CacheException implements Exception {
  final String errorMessage;
  CacheException(this.errorMessage);
}`;
}