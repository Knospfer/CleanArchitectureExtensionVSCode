export function failure(){
    return `part of '../core_imports.dart';

    abstract class Failure implements Error {
      final String errorMessage;
      Failure(this.errorMessage);
    }
    
    abstract class ServerFailure implements Failure {
      final String errorMessage;
      ServerFailure(this.errorMessage);
    }
    
    abstract class CacheFailure implements Failure {
      final String errorMessage;
      CacheFailure(this.errorMessage);
    }
    `;
}