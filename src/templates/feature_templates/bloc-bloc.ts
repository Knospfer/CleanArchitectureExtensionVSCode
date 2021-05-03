import { toPascalCaseFiltered, toSnakeCaseFiltered } from "../../utils/utils";

export function blocBloc(fileName: string) {
  const snakeCaseFileName = toSnakeCaseFiltered(fileName, "bloc", "state", "imports");
  const pascalCaseFileName = toPascalCaseFiltered(fileName, "bloc", "state", "imports");
  return `part of '../../../${snakeCaseFileName}_imports.dart';
      
@injectable
class ${pascalCaseFileName}Bloc extends Bloc<${pascalCaseFileName}Event, ${pascalCaseFileName}State> {
  final ${pascalCaseFileName}UseCase ${pascalCaseFileName}UseCase;
    
  ${pascalCaseFileName}Bloc(this.${pascalCaseFileName}UseCase) : super(${pascalCaseFileName}Initial());
    
  @override
  Stream<${pascalCaseFileName}State> mapEventToState(
    ${pascalCaseFileName}Event event,
  ) async* {
    if (event is EVENT_TO_IMPLEMET) {
      yield ${pascalCaseFileName}Loading();
      final either = await ${pascalCaseFileName}UseCase(${pascalCaseFileName}Params(event.data)); //    TODO IMPLEMENT!
      yield* either.fold((failure) async* {
        yield ${pascalCaseFileName}Error();
      }, (_) async* {
        yield ${pascalCaseFileName}Loaded();
      });
    }
  }
}`;
}