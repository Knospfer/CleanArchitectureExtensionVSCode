import { toCamelCaseFiltered, toPascalCaseFiltered, toSnakeCaseFiltered } from "../../utils/utils";

export function blocBloc(fileName: string) {
  const snakeCaseFileName = toSnakeCaseFiltered(fileName, "bloc", "state", "imports");
  const pascalCaseFileName = toPascalCaseFiltered(fileName, "bloc", "state", "imports");
  const camelCaseFilename = toCamelCaseFiltered(fileName, "bloc", "state", "imports");

  return `part of '../../../${snakeCaseFileName}_imports.dart';
      
@injectable
class ${pascalCaseFileName}Bloc extends Bloc<${pascalCaseFileName}Event, ${pascalCaseFileName}State> {
  final ${pascalCaseFileName}UseCase ${camelCaseFilename}UseCase;
    
  ${pascalCaseFileName}Bloc(this.${camelCaseFilename}UseCase) : super(${pascalCaseFileName}Initial());
    
  @override
  Stream<${pascalCaseFileName}State> mapEventToState(
    ${pascalCaseFileName}BaseEvent event,
  ) async* {
    if (event is ${pascalCaseFileName}Event) {
      yield ${pascalCaseFileName}Loading();
      final either = await ${camelCaseFilename}UseCase(event.data);
      yield* either.fold((failure) async* {
        yield ${pascalCaseFileName}Error();
      }, (_) async* {
        yield ${pascalCaseFileName}Loaded();
      });
    }
  }
}`;
}