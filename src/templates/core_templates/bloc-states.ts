export function basicBlocStates() {
    return `part of "../core_imports.dart";
abstract class BaseState {}

abstract class InitialState extends BaseState {}
    
abstract class LoadingState extends BaseState {}
    
abstract class LoadedState extends BaseState {}
    
abstract class ErrorState extends BaseState {
    final String errorMessage;
    ErrorState(this.errorMessage);
}`;
}