import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UniqueIdService } from '../../unique-id.service';
import { LikeWidgetComponent } from './like-widget.component';

// Por padrão, a detecção de mudanças de um componente não é disparada automaticamente
// ao executarmos nossos testes. É preciso que o desenvolvedor faça essa detecção manualmente.

describe(LikeWidgetComponent.name, () => {
  //   fixture é um wrapper ou seja e o que embrulha o meu componente dentro dele temos uma instacia do meu componente.
  let fixture: ComponentFixture<LikeWidgetComponent> = null;
  let component: LikeWidgetComponent = null;

  // É possível tornar a detecção de mudanças automática em nossos testes, apesar da equipe do Angular não recomendá-la.

  //criar uma instancia deste component antes dos nossos testes
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule],
      providers: [UniqueIdService],
      // declarations: [LikeWidgetComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LikeWidgetComponent);
    component = fixture.componentInstance;
  });
  it('should create component', () => {
    //testes aqui
    expect(component).toBeTruthy();
  });

  it('should auto-generate ID during NgOnINit when (@Input id) is not assigned', () => {
    fixture.detectChanges();
    expect(component.id).toBeTruthy();
  });
  it('should NOT auto-generate ID during NgOnINit when (@Input id) is assigned', () => {
    const someId = 'someID';

    component.id = someId;
    fixture.detectChanges();
    expect(component.id).toBe(someId);
  });

  // A função it, quando recebe um parâmetro geralmente chamado done, este parâmetro é
  //  uma referência para uma função que sinaliza para o teste que ele terminou.
  //  É importante que o desenvolvedor chame a função done no momento em que achar adequado,
  //   caso contrário o teste nunca terminará e um erro de timeout será disparado.

  it(`#${LikeWidgetComponent.prototype.like.name}
  should trigger (@Output liked) when called`, () => {
    // NgOnit é disparado cada vez que chamamos o fixture.detectChanges
    // (ciclo de vida do angular fica em nosssas maos para dizer quando ele deve ser disparado durante o teste)
    spyOn(component.liked, 'emit');
    fixture.detectChanges();
    component.like();
    expect(component.liked.emit).toHaveBeenCalled();
  });
});
