                className={`card-container relative overflow-hidden rounded-2xl border border-border backdrop-blur-sm bg-background/80 dark:bg-card/30 
                transition-all duration-500 ${type.shadow} cursor-pointer hover:translate-y-[-8px] hover:border-transparent
                dark:hover:shadow-[0_10px_20px_rgba(0,0,0,0.3)]`}
                onClick={() => handleProductTypeSelect(type.id)}
              >
                {/* 卡片发光效果 */}
                <div className={`absolute -inset-0.5 ${type.bgGradient} opacity-0 group-hover:opacity-15 rounded-2xl blur-sm transition-opacity duration-500 dark:group-hover:opacity-10`}></div>
              
                {/* 角标标签 */}
                <div className={`absolute z-20 top-0 right-0 ${type.badgeColor} text-white text-xs font-medium py-1 px-3 rounded-bl-lg rounded-tr-lg shadow-sm`}>
                  {type.badge}
                </div>
                
                {/* 卡片背景渐变效果 */}
                <div className={`card-bg absolute inset-0 opacity-0 group-hover:opacity-40 transition-opacity duration-500 ${type.bgGradient}`}></div>
              </div> 