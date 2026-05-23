import { useState } from 'react';
import { X, Printer } from 'lucide-react';
import { useEstimate } from '../context/EstimateContext';
import { useData } from '../context/DataContext';
import { Button } from './Button';
import { siteConfig } from '../data/siteConfig';

interface SubmitModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefillComment?: string;
}

export function SubmitModal({ isOpen, onClose, prefillComment }: SubmitModalProps) {
  const { items, clearAll } = useEstimate();
  const { addRequest } = useData();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [comment, setComment] = useState(prefillComment || '');
  const [view, setView] = useState<'form' | 'success'>('form');

  // If we came from the Turnkey section, we might not have items
  const isTurnkeyRequest = !!prefillComment;

  const grandTotal = items.reduce((sum, item) => sum + item.quantity * item.workItem.price, 0);

  if (!isOpen) return null;

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length === 0) return '';
    if (numbers.length <= 1) return `+7 (${numbers}`;
    if (numbers.length <= 4) return `+7 (${numbers.slice(1)}`;
    if (numbers.length <= 7) return `+7 (${numbers.slice(1, 4)}) ${numbers.slice(4)}`;
    if (numbers.length <= 9) return `+7 (${numbers.slice(1, 4)}) ${numbers.slice(4, 7)}-${numbers.slice(7)}`;
    return `+7 (${numbers.slice(1, 4)}) ${numbers.slice(4, 7)}-${numbers.slice(7, 9)}-${numbers.slice(9, 11)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(formatPhone(e.target.value));
  };

  const handleSendEmail = () => {
    const orderDetails = items.map(item => 
      `${item.workItem.name}: ${item.quantity} ${item.workItem.unit} x ${item.workItem.price} ₽ = ${item.quantity * item.workItem.price} ₽`
    ).join('\n');

    const emailBody = `
Новая заявка на расчет:

Клиент: ${name}
Телефон: ${phone}
Тип: ${isTurnkeyRequest ? 'Строительство под ключ' : 'Расчет по прайсу'}
Комментарий: ${comment || prefillComment || 'Нет'}

${items.length > 0 ? `Состав заказа:\n${orderDetails}\n\nИТОГО: ${grandTotal.toLocaleString()} ₽` : ''}
    `.trim();

    const subject = encodeURIComponent(`Заявка БЕЛ-СТРОЙ: ${name}`);
    const body = encodeURIComponent(emailBody);
    const mailtoUrl = `mailto:${siteConfig.adminEmail}?subject=${subject}&body=${body}`;
    
    // window.location.href = mailtoUrl;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    addRequest({
      name,
      phone,
      comment: comment || prefillComment || 'Без комментария',
      items: items.map(item => ({
        name: item.workItem.name,
        quantity: item.quantity,
        unit: item.workItem.unit,
        price: item.workItem.price,
        total: item.quantity * item.workItem.price,
      })),
      grandTotal: isTurnkeyRequest && items.length === 0 ? 0 : grandTotal,
    });

    handleSendEmail();
    setView('success');
  };

  const handleClose = () => {
    if (view === 'success') {
      clearAll();
    }
    onClose();
    setView('form');
    setName('');
    setPhone('');
    setComment('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1A1A1A]/90 p-4 print:p-0 print:bg-white">
      <div className="bg-white max-w-2xl w-full max-h-[90vh] flex flex-col relative shadow-2xl print:shadow-none print:max-h-none print:h-full overflow-hidden">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 text-[#1A1A1A] hover:text-[#B58B52] transition-colors print:hidden"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-12 overflow-y-auto print:overflow-visible print:p-0">
          {view === 'form' ? (
            <>
              <h3 className="mb-8 font-serif text-2xl text-[#1A1A1A]">
                {isTurnkeyRequest ? 'Заявка на строительство дома' : 'Оформить заявку на расчет'}
              </h3>
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-[#1A1A1A]">
                  <div>
                    <label className="block mb-2 text-[10px] uppercase tracking-widest opacity-40">Ваше имя *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-0 py-3 border-b border-[#1A1A1A]/20 focus:border-[#B58B52] focus:outline-none transition-colors text-lg bg-transparent"
                      placeholder="Имя"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-[10px] uppercase tracking-widest opacity-40">Телефон *</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={handlePhoneChange}
                      className="w-full px-0 py-3 border-b border-[#1A1A1A]/20 focus:border-[#B58B52] focus:outline-none transition-colors text-lg bg-transparent"
                      placeholder="+7 (___) ___ - __ - __"
                    />
                  </div>
                </div>

                <div className="text-[#1A1A1A]">
                  <label className="block mb-3 text-[10px] uppercase tracking-widest opacity-40">Примечание к заказу</label>
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows={4}
                    className="w-full p-4 bg-[#F5F5F0] border-none focus:ring-1 focus:ring-[#B58B52] focus:outline-none transition-colors resize-none text-sm leading-relaxed"
                    placeholder={isTurnkeyRequest ? "Опишите ваши пожелания, площадь дома, этажность или прикрепите ссылку на проект..." : "Дополнительные детали..."}
                  />
                </div>

                {/* Show estimate summary ONLY if it's NOT a turnkey request OR if there are items */}
                {!isTurnkeyRequest && items.length > 0 && (
                  <div className="bg-[#F5F5F0] p-8 text-[#1A1A1A]">
                    <h4 className="text-[10px] uppercase tracking-[0.2em] mb-6 opacity-40 font-bold">Предварительный состав работ:</h4>
                    <div className="space-y-3 mb-6 max-h-40 overflow-y-auto pr-4 text-sm">
                      {items.map((item, idx) => (
                        <div key={idx} className="flex justify-between gap-4">
                          <span className="opacity-70">{item.workItem.name}</span>
                          <span className="whitespace-nowrap font-bold">{(item.quantity * item.workItem.price).toLocaleString()} ₽</span>
                        </div>
                      ))}
                    </div>
                    <div className="border-t border-[#1A1A1A]/10 pt-6 flex justify-between items-end">
                      <span className="uppercase tracking-widest text-[10px] opacity-40 font-bold">Общая стоимость</span>
                      <span className="text-[#B58B52] text-3xl font-serif leading-none">{grandTotal.toLocaleString()} ₽</span>
                    </div>
                  </div>
                )}

                <Button type="submit" className="w-full py-5 text-sm uppercase tracking-[0.3em] font-bold shadow-lg">
                  {isTurnkeyRequest ? 'Отправить на расчет' : 'Подтвердить и получить смету'}
                </Button>
              </form>
            </>
          ) : (
            <div className="text-[#1A1A1A]">
              {/* Document View - Simplified for Turnkey if no items */}
              <div className="flex justify-between items-start mb-12 border-b-2 border-[#1A1A1A] pb-8">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-[#B58B52] flex items-center justify-center">
                      <span className="font-serif text-xl text-[#1A1A1A]">{siteConfig.shortName}</span>
                    </div>
                    <span className="font-serif text-2xl tracking-tighter uppercase">{siteConfig.name}</span>
                  </div>
                  <p className="text-[10px] uppercase tracking-widest opacity-50 max-w-[200px]">
                    Строительство и проектирование индивидуальных домов в Сочи
                  </p>
                </div>
                <div className="text-right">
                  <h1 className="text-3xl font-serif mb-2 uppercase tracking-widest">{isTurnkeyRequest && items.length === 0 ? 'Заявка' : 'Смета'}</h1>
                  <p className="text-sm opacity-60">№ {Math.floor(1000 + Math.random() * 9000)} от {new Date().toLocaleDateString('ru-RU')}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-8 mb-12">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] opacity-40 mb-2 font-bold">Заказчик</p>
                  <p className="text-xl font-medium">{name}</p>
                  <p className="text-sm opacity-60">{phone}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] uppercase tracking-[0.2em] opacity-40 mb-2 font-bold">Исполнитель</p>
                  <p className="text-sm font-medium">{siteConfig.name}</p>
                  <p className="text-sm opacity-60">{siteConfig.contact.phone}</p>
                  <p className="text-sm opacity-60">{siteConfig.contact.email}</p>
                </div>
              </div>

              {items.length > 0 ? (
                <table className="w-full mb-12">
                  <thead>
                    <tr className="border-b-2 border-[#1A1A1A] text-left">
                      <th className="py-4 text-[10px] uppercase tracking-[0.2em] font-bold">Наименование работ и услуг</th>
                      <th className="py-4 text-right text-[10px] uppercase tracking-[0.2em] font-bold">Кол-во</th>
                      <th className="py-4 text-right text-[10px] uppercase tracking-[0.2em] font-bold">Цена</th>
                      <th className="py-4 text-right text-[10px] uppercase tracking-[0.2em] font-bold">Сумма</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1A1A1A]/10">
                    {items.map((item, idx) => (
                      <tr key={idx}>
                        <td className="py-4 text-sm font-medium pr-4">{item.workItem.name}</td>
                        <td className="py-4 text-right text-sm opacity-70 whitespace-nowrap">{item.quantity} {item.workItem.unit}</td>
                        <td className="py-4 text-right text-sm opacity-70 whitespace-nowrap">{item.workItem.price.toLocaleString()} ₽</td>
                        <td className="py-4 text-right text-sm font-bold whitespace-nowrap">{(item.quantity * item.workItem.price).toLocaleString()} ₽</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="border-t-2 border-[#1A1A1A]">
                      <td colSpan={3} className="py-6 text-right uppercase tracking-[0.3em] text-xs font-bold font-serif">Итого к оплате:</td>
                      <td className="py-6 text-right text-2xl font-serif text-[#B58B52] whitespace-nowrap">{grandTotal.toLocaleString()} ₽</td>
                    </tr>
                  </tfoot>
                </table>
              ) : (
                <div className="mb-12 p-8 bg-[#F5F5F0] border-l-4 border-[#B58B52]">
                  <p className="text-[10px] uppercase tracking-widest opacity-40 mb-4 font-bold">Ваш комментарий:</p>
                  <p className="text-sm italic leading-relaxed">"{comment || prefillComment}"</p>
                  <p className="mt-8 text-xs opacity-60 leading-relaxed">
                    Инженер свяжется с вами в течение часа для уточнения деталей и подготовки предварительного расчета.
                  </p>
                </div>
              )}

              <div className="mb-12 text-[11px] text-[#1A1A1A]/50 leading-relaxed max-w-md italic">
                * {isTurnkeyRequest && items.length === 0 ? 'Заявка принята в обработку.' : 'Данный расчет является предварительным и не является публичной офертой.'} 
                Окончательная стоимость фиксируется в договоре после выезда специалиста на объект.
              </div>

              <div className="flex gap-4 print:hidden border-t pt-8">
                {items.length > 0 && (
                  <Button variant="primary" onClick={() => window.print()} className="flex-1 flex items-center justify-center gap-3 py-4 text-xs uppercase tracking-widest">
                    <Printer className="w-4 h-4" />
                    Скачать PDF / Печать
                  </Button>
                )}
                <Button variant="outline" onClick={handleClose} className="flex-1 py-4 text-xs uppercase tracking-widest">
                  Закрыть
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
